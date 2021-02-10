import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {RootStore} from "./models/Store" ;
import {Tile, Controls, InfoBar, GameScreenModal} from "./components/" ; 
import {window, screen} from "./env" ;
import {autorun} from "mobx" 
import {colors} from "./Functions/Utils" ;

import {observer} from "mobx-react-lite" ; 

//const color1 = '#35a492' ; 
//const color2 ='#12a0df' ; 
const possibleColors = colors() ; 

//TODO: Generate Some random tile counts 
const width = 5 ;
const height = 5 ;

// TODO: Add Difficulty level dependent on number of random flips 
const randomFlipNumber = Math.floor(Math.random()*4) + 1 ; // Number of flips //TODO:I think should depend to width and height of board.

var initialTileColors = []
for(var i=0; i< width*height; i++){
  initialTileColors.push(possibleColors[0]) ; 
}
//console.log(initialTileColors)

const store = RootStore.create({
  possibleColors: [possibleColors[0], possibleColors[1]], 
  movesCount: 0,
  flipMod: '4',
  widthTileNum: width,
  heightTileNum: height,
  edgeHandling: 'None',
  initialState: initialTileColors,
  tileColors: initialTileColors,
  goodEndFlipCount: randomFlipNumber, 
  gameStatus: 'notdone',
  difficulty: 'medium',
}) ; 

for(let i=0; i<randomFlipNumber; i++){
  let toBeFlipIDX = Math.floor(Math.random() * store.tileNum);
  store.flipTiles(toBeFlipIDX, false) ; 
}


autorun(()=>{
  console.log(store.tileColors) ;
  console.log(store.gameStatus); 
}) ; 


store.setTileColors() ; 


export default function App() {

  const [dimensions, setDimensions] = useState({ window, screen });
  
  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
    store.dims.setWidthHeight(window.width, window.height) ;
    //store.setOrientation() ;  
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });


  return (
    <View style={[styles.container, {
      flexDirection: 'column',
    }]}>
      <InfoBar store={store} />
      <GameScreenModal store={store}/>

      {[...Array(store.heightTileNum).keys()].map(height_idx => (
        <View style={[
          {flexDirection: 'row'}
          ]}
          key={
            height_idx
          }>
          {[...Array(store.widthTileNum).keys()].map(width_idx =>
          <Tile index={store.widthTileNum* (height_idx) + width_idx} store={store} key={height_idx*width + width_idx}/>
          )
          }
        </View>
      )
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
