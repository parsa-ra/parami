import {types} from "mobx-state-tree"
import React from "react" 
import {RootStore} from "./Store" ; 

// Overall Game State 
// TODO: This should be loaded each time game starts up

export const Game = types.create({
    firstTime: types.boolean(), // Depicts if this is the first time the app is launched, for example to show some tutorial stuff ... 
    totalTimePlayed: types.optional(types.number), 
    totalGamePlayed: types.optional(types.number), 
    store: types.map(RootStore),  //Pick where you left off resemblance
})