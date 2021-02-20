import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
//import {AsyncStorage} from 'react-native'
import {GameStore} from "./models/GameStore" ;
import {RootStore} from "./models/RootStore" ; 
import {window, screen} from "./env" ;
import {autorun} from "mobx" 

import {colors, randomPickFromCurrentNode, timeout, uniformIntTo} from "./Functions/Utils" ;

import {observer} from "mobx-react-lite" ; 
import { applySnapshot, getSnapshot, onPatch, onSnapshot, unprotect } from 'mobx-state-tree';

import {messages} from "./components/Messages" ; 

import {Navigator} from "./components" ; 

import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const possibleColors = colors() ; 

// // Initial Tile Count 
// const width =  4;
// const height = 4 ;

// // TODO: Add Difficulty level dependent on number of random flips 
// const randomFlipNumber = Math.floor(Math.random()*4) + 1 ; // Number of flips //TODO:I think should depend to width and height of board.

// var initialTileColors = []
// for(var i=0; i< width*height; i++){
//   initialTileColors.push(possibleColors[0]) ; 
// }
// //console.log(initialTileColors)
// //console.log(GameStore) ; 
// //console.log(GameStore.properties.difficulty._types)  ; 

// // TODO: Decide Persistent Storage, For example, local or using firebase
// const store = GameStore.create({
//   possibleColors: [possibleColors[0], possibleColors[1]], 
//   movesCount: 0,
//   flipMode: '8',
//   widthTileNum: width,
//   heightTileNum: height,
//   edgeHandling: 'None',
//   initialState: initialTileColors,  
//   tileColors: initialTileColors,
//   goodEndFlipCount: randomFlipNumber, 
//   gameStatus: 'notdone',
//   gameSolution: [],
//   initialSolution: [],
//   difficulty: 'Medium',
// }) ; 

// for(let i=0; i<randomFlipNumber; i++){
//   let toBeFlipIDX = Math.floor(Math.random() * store.tileNum);
//   store.flipTiles(toBeFlipIDX, false) ; 
// }
// store.setTileColors() ; 

// const rootStore = RootStore.create({
//     firstTime: true,
//     totalTimePlayed: 0, 
//     totalGamePlayed: 0, 
//     //store: {},
//     //toBeAppliedStore: {},
//     navStack: [
//        'home'
//     ],
//     notificationQueue: [
//     ]
// }) ;    

// applySnapshot(rootStore.store, getSnapshot(store)) ; 
// applySnapshot(rootStore.toBeAppliedStore, getSnapshot(store)) ; 

// rootStore.setMessageView(true) ; 



let rootStore ;
let rootStoreSnapShot ; 


// TODO: Autoruns after adding Async isn't working, check this issue later, currently we mimicking the effect 
// in gamestore
// autorun(()=>{
//   console.log("test") ; 
//     // When the user without any attempt try to view the solution. 
//     if( rootStore.store.resetWithoutTrial >= 1 ){
//         rootStore.pushToNotificationQueue({
//             'message' : messages.gameScreen.resetWithoutTrial[uniformIntTo(
//               Object.keys(messages.gameScreen.resetWithoutTrial).length)],
//             'screen': 'game',
//             'timeout': 6000, 
//             'type': 'tip.normal',
//           })
//     }
// }) ;


const loadRootStore = async () => {
  const timeThreshold = 1000 * 60 * 60 * 24 * 3 ; 
  try{
    rootStoreSnapShot = await AsyncStorage.getItem("rootStore") ;
    
    console.log(rootStoreSnapShot) ; 
    if(rootStoreSnapShot != null){
      console.log(JSON.parse(rootStoreSnapShot)) ; 
      //applySnapshot(rootStore, JSON.parse(rootStoreSnapShot)) ; 
      rootStore = RootStore.create(JSON.parse(rootStoreSnapShot)) ; 
      console.log("Loading Game From LocalStorage") ; 

      if(rootStore.lastTimeIn - Date.now() > timeThreshold ){
      rootStore.pushToNotificationQueue(
        {
          'message' : randomPickFromCurrentNode(messages.general.userEntersTheGame.longtimeago) , 
          'screen': 'home',
          'timeout': 6000, 
          'type': 'tip.normal',
        }
      )
      }else{
        rootStore.pushToNotificationQueue(
          {
            'message' : randomPickFromCurrentNode(messages.general.userEntersTheGame.recent),
            'screen': 'home',
            'timeout': 6000, 
            'type': 'tip.normal',
          }
        )      
      }
      rootStore.setTimeIn() ;

    }else{
      console.log("Initializing a New Environment") ;
      rootStore = RootStore.create({
        firstTime: true,
        totalTimePlayed: 0, 
        totalGamePlayed: 0, 
        lastTimeIn: Date.now(),
        //store: {},
        //toBeAppliedStore: {},
        navStack: [
           'home'
        ],
        notificationQueue: [
        ]
    }) ;
    rootStore.pushToNotificationQueue(
      {
        'message' : messages.general.userEntersTheGame.firstTime[uniformIntTo(Object.keys(messages.general.userEntersTheGame.firstTime).length)],
        'screen': 'home',
        'timeout': 4000, 
        'type': 'tip.normal',
      }
    ) ;

    rootStore.pushToNotificationQueue({
      'message': randomPickFromCurrentNode(messages.gameScreen.solutionTip),
      'screen': 'game',
      'timeout': 8000,
      'type': 'tip.important',
    });

    }

    onPatch(rootStore, newPatch=>{
      console.log(newPatch) ; 
    }) ; 


    // TODO: Important, onSnapShot will be called in each user tap on anything which is not efficient to store the state in this way, 
    // instead I think it's better to update the state in regular timestamps.
    // onSnapshot(rootStore.store, storeSnapshot =>{
    //     (async() => {
    //         console.log("Begin storing rootStore.store") ; 
    //         await AsyncStorage.setItem("rootStore.store", JSON.stringify(storeSnapshot)) ; 
    //         console.log("storing completed") ; 
    //     })();
    // })


    const updatingInterval = 20; // seconds
    setInterval(()=>{
      console.log("Begin Storing the State") ; 
      try{
        (async() => {
          await AsyncStorage.setItem("rootStore", JSON.stringify(getSnapshot(rootStore))) ; 
          console.log("Updating RootStore complete")
        })();
      }catch(e){
        console.warn(e) ; 
      }
    }, updatingInterval* 1000);

    return rootStore ; 

  }catch(e){
    // Fallback 
    console.warn(e) ; 
  }
}


export default function App() {

  const [appState, setAppState] = useState(false) ; 
  //const [dimensions, setDimensions] = useState({ window, screen });

  // async function loadStores() {
  //   console.log("Load Store")  ;
  //   try {
  //      rootStore = await loadRootStore() ; 
  //   }catch(e){
  //     console.warn(e) ; 
  //   }finally{
  //       setAppState(true) ; 
  //       await SplashScreen.hideAsync();
  //       return rootStore;
  //   }
  // }

  useEffect(()=>{
    try{
      (async() => {
        await SplashScreen.preventAutoHideAsync();
        })();
      (async () => {
          console.log("Load Store")  ;
          try {
            rootStore = await loadRootStore() ; 
            await SplashScreen.hideAsync();
            setAppState(true) ; 
          }catch(e){
            console.warn(e) ; 
          }finally{

          } 
      })();

      const onChange = ({ window, screen }) => {
        //setDimensions({ window, screen });
        rootStore.store.dims.setWidthHeight(window.width, window.height) ;
        
      };

      Dimensions.addEventListener('change', onChange);

    }catch (e) {
      console.warn(e) ; 
    }

  }, []) // Note that the empty list at the end meant to useEffect to only fire once when the object mounted.

  
  return appState ? 
    <View style={[styles.container, {
    }]}>

      <Navigator rootStore={rootStore}/>
      
      <StatusBar hidden={true} />
    </View> 
    : //For Web only
    <View style={{justifyContent: 'center', alignItems: 'center', flex:1}}>
      <ActivityIndicator/>
    </View>
    
  ;
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
