import {applySnapshot, getSnapshot, types} from "mobx-state-tree" ; 
import React from "react"  ;
import {values} from "mobx" ; 
import {GameStore} from "./GameStore" ; 

// Overall Game State 
// TODO: This should be loaded each time game starts up

export const RootStore = types.model({
    firstTime: types.boolean, // Depicts if this is the first time the app is launched, for example to show some tutorial stuff ... 
    totalTimePlayed: types.number, // In seconds
    totalGamePlayed: types.number, 
    store: types.optional(GameStore, {
        possibleColors: [], 
        movesCount: 0,
        flipMode: '4',
        widthTileNum: 0,
        heightTileNum: 0,
        edgeHandling: 'None',
        initialState: [],
        tileColors: [],
        goodEndFlipCount: 0, 
        gameStatus: 'notdone',
        gameSolution: [],
        difficulty: 'Medium',
      }),  //Pick where you left off resemblance
    toBeAppliedStore: types.optional(GameStore, {
        possibleColors: [], 
        movesCount: 0,
        flipMode: '4',
        widthTileNum: 0,
        heightTileNum: 0,
        edgeHandling: 'None',
        initialState: [],
        tileColors: [],
        goodEndFlipCount: 0, 
        gameStatus: 'notdone',
        gameSolution: [],
        difficulty: 'Medium',
      }), // This will be filled when user changes the setting and later on requesting a new game will be deployed to store.
    navStack: types.array(types.string)
}).actions((self)=>{
    return{
        setNavStack(screen){
            self.navStack.push(screen) ; 
        },
        setStore(store){
            applySnapshot(self.store, getSnapshot(store)) ;  
        },
        setToBeAppliedStore(store){
            self.toBeAppliedStore = store ; 
        }
    }
}).views((self)=>{
    return{
        get lastNavEntry(){
            return self.navStack[self.navStack.length -1]
        },
    }
}) ; 