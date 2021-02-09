import React from "react"
import {types} from "mobx-state-tree"
import {window, screen} from "../env" 
//import { string } from "mobx-state-tree/dist/internal";


export const Dims = types.model({
    width: types.number,
    height: types.number, 
}).actions((self)=>{
    return{
        setWidthHeight(width, height){
            self.width = width ; 
            self.height = height ; 
        }
    }
})

export const Position = types.model({
    x: types.number,
    y: types.number,
})

export const RootStore = types.model({
    ////////////////////////
    // Game Dynamics States 
    ////////////////////////
    possibleColors: types.array(types.string), // ...
    movesCount: types.number, // Number of moves player made
    flipMod: types.enumeration(['4', '8']), // The mode which tile colors flip upon push.
    widthTileNum: types.number, // Number of Tiles in X axis
    heightTileNum: types.number, // Number of Tiles in Y axis
    tileColors: types.array(types.string),
    edgeHandling: types.enumeration(['None']), // How edges in flipping handled
    gameStatus: types.enumeration(['done', 'notdone']),

    //////////////////
    // General States
    /////////////////
    dims: types.optional(Dims, {
        width: window.width,
        height: window.height
    }), // Dimension of the Page
    
}).actions((self) =>{
    return{
    flipTiles(tileIndex){
        console.log('flipTiles called') ; 
        if(self.edgeHandling == 'None' & self.flipMod == '4'){
            //console.log(self.relativeIndexesForMode4()) ; 
            self.relativeIndexesForMode4.forEach(elem => {
                const idx = elem+tileIndex ; 
                if(elem == -1 || elem == +1){
                    //Emulation of same Height condition
                    if(Math.floor(idx/self.widthTileNum) == Math.floor(tileIndex/self.widthTileNum) ){
                        self.filpSpecificTile(idx) ; 
                    }
                }else{
                    if(idx >=0 && idx < self.tileNum){
                        self.filpSpecificTile(idx) ; 
                    }
                }
                // if(idx >= 0 && idx < self.tileNum){
                //     self.filpSpecificTile(idx) ; 
                // }
            }); 
        }

        //TODO: Handle other Combinations

    },  

    updateState(){
        self.movesCount += 1 ;
        self.gameStatus = self.allTheSame ? 'done' : 'notdone' ; 
    }
    ,
    filpSpecificTile(idx){ 
        if(self.tileColors[idx] == self.possibleColors[0]){
            self.tileColors[idx] = self.possibleColors[1]; 
        }else{
            self.tileColors[idx] = self.possibleColors[0]
        }
    },
    toggleFlipMod(){
        if(self.flipMod == '4'){
            self.flipMod = '8' ;
        }else{
            self.flipMod = '4' ;
        }
    }
    }
}).views((self) => {
    return{
    get tileNum(){
        return self.widthTileNum * self.heightTileNum
    },
    get relativeIndexesForMode4(){
        return [0, +1, -1, -self.widthTileNum, +self.widthTileNum]
    },
    get relativeIndexesForMode8(){
        return [0, +1, -1, -self.widthTileNum-1, -self.widthTileNum, -self.widthTileNum+1, +self.widthTileNum-1, +self.widthTileNum, + self.widthTileNum+1]
    },
    get allTheSame(){
        for(let i=1; i<self.tileNum; i++){
            if(self.tileColors[i-1] !== self.tileColors[i])
            {return false}
            return true ; 
        }
    }
}
}) ; 
