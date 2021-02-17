import {applySnapshot, getSnapshot, types, flow} from "mobx-state-tree" ; 
import React from "react"  ;
import {values} from "mobx" ; 
import {GameStore} from "./GameStore" ; 
import {colors} from "../styles/styles" ; 
import {screens} from "../Screens" ; 
import {timeout} from "../Functions/Utils"

const seperator = '.' 
const notificationColors =[]  ; 
for(var typeCat in colors.light.message){
    for(var catColor in colors.light.message[typeCat] ){
        notificationColors.push(typeCat + seperator + catColor) ; 
    }
} 
// Overall Game State 
// TODO: This should be loaded each time game starts up

export const ModalNotification = types.model({
    type: types.enumeration(notificationColors),
    message: types.string,
    timeout: types.optional(types.number, 1000),
    screen: types.enumeration(screens), 
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
    messageView: types.optional(types.boolean, false),
    viewClosePending: types.optional(types.boolean, false),
    currentNotificationIdx: types.optional(types.number, 0),
    
}).actions((self)=>{
    let viewTimeOut ; 
    return{
        setNavStack(screen){
            self.messageView = false ;
            self.navStack.push(screen) ; 
            // Check, if to display any new notification
            viewTimeOut = self.checkNotificationView();
            console.log(viewTimeOut) ; 
            viewTimeOut.then(() => {self.setMessageView(false)}) ; 
        },
        setStore(store){
            applySnapshot(self.store, getSnapshot(store)) ;  
        },
        setToBeAppliedStore(store){
            self.toBeAppliedStore = store ; 
        },
        setMessageView(messageView){
            self.messageView = messageView ; 
        },
        setCurrentNotificationIdx(Idx){
            self.setCurrentNotificationIdx = Idx ; 
        },
        pushToNotificationQueue(notification){ 
            self.messageView = false ;  
            self.notificationQueue.push(notification) ; 
        
            // Check, if to display any new notification 
            viewTimeOut = self.checkNotificationView();
            viewTimeOut.then(()=>{ self.setMessageView(false)}) ; 
            
        },
        checkNotificationView: flow(function* checkNotificationView(){
            if(self.notificationQueue.length > 0){

                var toDisplayIdx = [];
                for(let i=0; i<self.notificationQueue.length ; i++ ){ 
                  if(self.notificationQueue[i].screen == self.navStack[self.navStack.length -1]){
                    toDisplayIdx.push(i) ; 
                  }
                }
                
                if(toDisplayIdx.length > 0){
                    // Display most recent notification 
                    // TODO: maybe we must change it ? 
                    self.messageView = true ;

                    self.currentNotificationIdx = toDisplayIdx[toDisplayIdx.length - 1 ] ;

                    yield timeout(self.notificationQueue[self.currentNotificationIdx].timeout)
                }
   
            }
        }),
    }
}).views((self)=>{
    return{
        get lastNavEntry(){
            return self.navStack[self.navStack.length -1]
        },
    }
}) ; 