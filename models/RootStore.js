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
    flipMode: '8',
    widthTileNum: 4,
    heightTileNum: 4,
    edgeHandling: 'None',
    initialState: [],
    tileColors: [],
    goodEndFlipCount: 0, 
    gameStatus: 'notdone',
    gameSolution: [],
    initialSolution: [],
    difficulty: 'Easy',
}

export const RootStore = types.model({
    firstTime: types.boolean, // Depicts if this is the first time the app is launched, for example to show some tutorial stuff ... 
    totalTimePlayed: types.number, // In seconds
    totalGamePlayed: types.number,  
    lastTimeIn: types.optional(types.number, 0),
    store: types.optional(GameStore, {
            ...GameStoreDefaultValues
      }),  //Pick where you left off resemblance
    toBeAppliedStore: types.optional(GameStore, {
            ...GameStoreDefaultValues
      }), // This will be filled when user changes the setting and later on requesting a new game will be deployed to store.
    navStack: types.array(types.string),

    // Experimental 
    enabledConversationMode: types.optional(types.boolean, true),
    notificationQueue: types.array(ModalNotification),
    messageView: types.optional(types.boolean, false),
    viewClosePending: types.optional(types.boolean, false),
    currentNotificationIdx: types.optional(types.number, 0),
    
}).actions((self)=>{
    let viewTimeOut ; 
    var timeoutHandlers = [] ;

    return{
        setNavStack(screen=null){ // When nothing is passed it will going back to the previous screen, mimicking the BACK effect.
            self.messageView = false ;
            for(let idx in timeoutHandlers ){ clearTimeout(timeoutHandlers[idx]) ; }
            timeoutHandlers = [] ; 

            if(screen){
                self.navStack.push(screen);
            }else{
            self.navStack.pop() ;
            }
            // Check, if to display any new notification
            viewTimeOut = self.checkNotificationView();
            viewTimeOut.then(() => {self.setMessageView(false)
                                    self.deleteFromNotificationQueue(self.currentNotificationIdx)}) ; 
        },
        toggleConversationMode(){
            self.enabledConversationMode = !self.enabledConversationMode ;
        },
        setTimeIn(){
            self.lastTimeIn = Date.now() ; 
        },
        increaseTotalPlayedGame(){
            self.totalGamePlayed += 1 ;
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
        deleteFromNotificationQueue(idx){
            self.notificationQueue.splice(idx, 1) ; 
        },
        pushToNotificationQueue(notification){ 
            if(!self.enabledConversationMode){
                return
            }

            // Check, if to display any new notification 
            viewTimeOut = self.checkNotificationView(notification);
            viewTimeOut.then(()=>{ self.setMessageView(false)
                                   self.deleteFromNotificationQueue(self.currentNotificationIdx)}) ; 
            
        },
        checkNotificationView: flow(function* checkNotificationView(notification=null){
                //console.log(self.notificationQueue.toJSON()) ; 

                if(notification){
                    if(self.notificationQueue.length > 1){
                    self.notificationQueue.splice(self.currentNotificationIdx, 1) ; 
                    self.notificationQueue.push(notification) ; 
                    }else{
                        self.notificationQueue.push(notification) ; 
                    }
                }

                let toDisplayIdx = [];
                // Get Messages Targeted for current Screen
                for(let i=0; i<self.notificationQueue.length ; i++ ){ 
                  if(self.notificationQueue[i].screen == self.lastNavEntry){
                    toDisplayIdx.push(i) ; 
                  }
                }
                
                console.log(toDisplayIdx) ; 
                // If any available, well, show them ...
                if(toDisplayIdx.length > 0){
                    self.messageView = false ;
           
                    for(let idx in timeoutHandlers ){ clearTimeout(timeoutHandlers[idx]) ;}  
                    timeoutHandlers = []; 
                    self.currentNotificationIdx = toDisplayIdx[toDisplayIdx.length - 1 ] ;
                    // Display most recent notification 
                    // TODO: maybe we must change it ? 
                    self.messageView = true ;


                    yield new Promise((resolve, reject) => {
                        // for(let idx in timeoutHandlers ){ clearTimeout(timeoutHandlers[idx]) }
                        // timeoutHandlers = [] ; 
                        timeoutHandlers.push(setTimeout(resolve, 
                            self.notificationQueue[self.currentNotificationIdx].timeout));}
                        )
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