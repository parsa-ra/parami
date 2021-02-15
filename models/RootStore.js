import {applySnapshot, getSnapshot, types} from "mobx-state-tree" ; 
import React from "react"  ;
import {values} from "mobx" ; 
import {GameStore} from "./GameStore" ; 

// Overall Game State 
// TODO: This should be loaded each time game starts up

export const ModalNotification = types.model({
    severity: types.enumeration(['low','medium', 'high', 'critical']),
    message: types.string,
    timeout: types.optional(types.number, 1000),
    screen: types.string, 
}) 

const GameStoreDefaultValues = {
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
    initialSolution: [],
    difficulty: 'Medium',
}

export const RootStore = types.model({
    firstTime: types.boolean, // Depicts if this is the first time the app is launched, for example to show some tutorial stuff ... 
    totalTimePlayed: types.number, // In seconds
    totalGamePlayed: types.number,  
    store: types.optional(GameStore, {
            ...GameStoreDefaultValues
      }),  //Pick where you left off resemblance
    toBeAppliedStore: types.optional(GameStore, {
            ...GameStoreDefaultValues
      }), // This will be filled when user changes the setting and later on requesting a new game will be deployed to store.
    navStack: types.array(types.string),

    // Experimental 
    notificationQueue: types.array(ModalNotification),
    messageView: types.optional(types.boolean, false) ,

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
        },
        setMessageView(messageView){
            self.notificationQueue.push({
                severity: 'high',
                message: 'Testing Modal View, This is some relatively long text to see what will happens to the container in many different scenarios.',
                timeout: 2000,
                screen: 'home', 
            });
            self.messageView = messageView ; 
        }
    }
}).views((self)=>{
    return{
        get lastNavEntry(){
            return self.navStack[self.navStack.length -1]
        },
    }
}) ; 