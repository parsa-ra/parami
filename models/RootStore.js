import {types} from "mobx-state-tree"
import React from "react" 
import {GameStore} from "./GameStore" ; 

// Overall Game State 
// TODO: This should be loaded each time game starts up

export const RootStore = types.model({
    firstTime: types.boolean, // Depicts if this is the first time the app is launched, for example to show some tutorial stuff ... 
    totalTimePlayed: types.number, // In seconds
    totalGamePlayed: types.number, 
    store: types.map(GameStore),  //Pick where you left off resemblance
    navStack: types.array(types.string)
}).actions((self)=>{
    return{
        setNavStack(screen){
            self.navStack.push(screen) ; 
        }
    }
}).views((self)=>{
    return{
        get lastNavEntry(){
            return self.navStack[self.navStack.length -1]
        },
    }
}) ; 