import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {RootStore} from "./models/Store" ;
import {Tile} from "./components/Tile" ; 
import {window, screen} from "./env" ;
import {autorun} from "mobx" 


//TODO: Generate Some random colors
const color1 = '#35a492' ; 
const color2 ='#12a0df' ; 

//TODO: Generate Some random tile counts 
const width = 4 ;
const height = 4 ;

//TODO: Generating Solvable initialColor
var initialTileColors = []
for(var i=0; i< width*height; i++){
  initialTileColors.push(color1) ; 
}
console.log(initialTileColors)

const store = RootStore.create({
  possibleColors: [color1, color2], 
  movesCount: 0,
  flipMod: '4',
  widthTileNum: width,
  heightTileNum: height,
  edgeHandling: 'None',
  tileColors: initialTileColors,
}) ; 



autorun(()=>{
    console.log(store.tileColors) ; 
}) ; 


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
      {[...Array(store.heightTileNum).keys()].map(height_idx => (
        <View style={[
          {flexDirection: 'row'}
          ]}>
          {[...Array(store.widthTileNum).keys()].map(width_idx =>
          <Tile index={store.widthTileNum* (height_idx) + width_idx} store={store}/>
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
