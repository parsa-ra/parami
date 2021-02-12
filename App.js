import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {AsyncStorage} from 'react-native'
import {GameStore} from "./models/GameStore" ;
import {RootStore} from "./models/RootStore" ; 
import {HomeScreen, GameScreen, SettingScreen} from "./Screens"; 
import {window, screen} from "./env" ;
import {autorun} from "mobx" 
import {colors} from "./Functions/Utils" ;

import {observer} from "mobx-react-lite" ; 
import { applySnapshot, getSnapshot, unprotect } from 'mobx-state-tree';

const possibleColors = colors() ; 

//TODO: Generate Some random tile counts 
const width = 6 ;
const height = 6 ;

// TODO: Add Difficulty level dependent on number of random flips 
const randomFlipNumber = Math.floor(Math.random()*4) + 1 ; // Number of flips //TODO:I think should depend to width and height of board.

var initialTileColors = []
for(var i=0; i< width*height; i++){
  initialTileColors.push(possibleColors[0]) ; 
}
//console.log(initialTileColors)
//console.log(GameStore) ; 
//console.log(GameStore.properties.difficulty._types)  ; 

// TODO: Decide Persistent Storage, For example, local or using firebase
const store = GameStore.create({
  possibleColors: [possibleColors[0], possibleColors[1]], 
  movesCount: 0,
  flipMode: '8',
  widthTileNum: width,
  heightTileNum: height,
  edgeHandling: 'None',
  initialState: initialTileColors,
  tileColors: initialTileColors,
  goodEndFlipCount: randomFlipNumber, 
  gameStatus: 'notdone',
  gameSolution: [],
  difficulty: 'Medium',
}) ; 

for(let i=0; i<randomFlipNumber; i++){
  let toBeFlipIDX = Math.floor(Math.random() * store.tileNum);
  store.flipTiles(toBeFlipIDX, false) ; 
}
store.setTileColors() ; 

const rootStore = RootStore.create({
    firstTime: true,
    totalTimePlayed: 0, 
    totalGamePlayed: 0, 
    //store: {},
    //toBeAppliedStore: {},
    navStack: [
       'home'
    ]
}) ; 

applySnapshot(rootStore.store, getSnapshot(store)) ; 
applySnapshot(rootStore.toBeAppliedStore, getSnapshot(store)) ; 

autorun(()=>{
  
}) ; 

const Navigator = observer((props)=>{
    switch(props.rootStore.lastNavEntry){
      case 'home':
        return <HomeScreen rootStore={props.rootStore} store={props.rootStore.store}/>
      case 'game':
        return <GameScreen rootStore={props.rootStore} store={props.rootStore.store}/>
      case 'setting':
        // Note what we pass to the Store... 
        return <SettingScreen rootStore={props.rootStore} store={props.rootStore.toBeAppliedStore}/>
    }
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
    }]}>

      <Navigator rootStore={rootStore}/>
      
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
