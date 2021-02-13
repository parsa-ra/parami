import React from "react"
import {types, cast} from "mobx-state-tree"
import {window, screen} from "../env" 
import {colors} from "../Functions/Utils"
import {tileMargin} from "../env" ; 
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

export const GameStore = types.model({
    ////////////////////////
    // Game Dynamics States 
    ////////////////////////
    possibleColors: types.array(types.string), // ...
    movesCount: types.number, // Number of moves player made
    flipMode: types.enumeration(['4', '8']), // The mode which tile colors flip upon push.
    widthTileNum: types.number, // Number of Tiles in X axis
    heightTileNum: types.number, // Number of Tiles in Y axis

    initialState: types.array(types.string),
    tileColors: types.array(types.string),
    goodEndFlipCount: types.number, // Upon gamestatus done notify user with how many moves it could be solved and suggest if he/she want to try that same configuration again

    edgeHandling: types.enumeration(['None']), // How edges in flipping handled
    gameStatus: types.enumeration(['done', 'notdone']),
    gameSolution: types.array(types.number),

    difficulty: types.enumeration(['Easy', 'Medium', 'Hard']),

    //////////////////
    // General States
    /////////////////
    dims: types.optional(Dims, {
        width: window.width,
        height: window.height
    }), // Dimension of the Page
    
}).actions((self) =>{
    return{
    flipTiles(tileIndex, performOnTiles=true){
        //console.log('flipTiles called') ; 
        if(self.edgeHandling == 'None' && self.flipMode == '4'){
            //console.log(self.relativeIndexesForMode4()) ; 
            self.relativeIndexesForMode4.forEach(elem => {
                const idx = elem+tileIndex ; 
                if(elem == -1 || elem == +1){
                    //Emulation of same Height condition
                    if(Math.floor(idx/self.widthTileNum) == Math.floor(tileIndex/self.widthTileNum) ){
                        self.flipSpecificTile(idx, performOnTiles) ; 
                    }
                }else{
                    if(idx >=0 && idx < self.tileNum){
                        self.flipSpecificTile(idx, performOnTiles) ; 
                    }
                }
            }); 
        }
        if(self.edgeHandling == 'None' && self.flipMode == '8'){
            self.relativeCoordsForMode8.forEach(elem =>{
                //const idx = elem + tileIndex ; 
                const PervCoord = [tileIndex%self.widthTileNum ,Math.floor(tileIndex/self.widthTileNum)]    // previous coordinate (x,y)
                const NewCoord = [PervCoord[0]+elem[0], PervCoord[1]+elem[1]]
                if(NewCoord[0] >= 0 && NewCoord[0] < self.widthTileNum && NewCoord[1] >=0 && NewCoord[1] < self.heightTileNum){
                    const idx = tileIndex + elem[0] + elem[1]*self.widthTileNum ; 
                    console.log(idx) ; 
                    self.flipSpecificTile(idx, performOnTiles) ; 
                }
            });
        }
        //TODO: Handle other Modes
    },  
    setDifficulty(diff){
        self.difficulty = diff ; 
    },
    updateState(){
        self.movesCount += 1 ;
        self.gameStatus = self.allTheSame ? 'done' : 'notdone' ; 
    },
    setTileCount(dim, value){
        if(dim == "width"){
            self.widthTileNum = value ; 
        }else if(dim == "height"){
            self.heightTileNum = value ;
        }else{
            console.warn("Unexpected Dimensional Value") ;
        }
    }
    ,
    flipSpecificTile(idx, performOnTiles){ 
        if(performOnTiles){
            if(self.tileColors[idx] == self.possibleColors[0]){
                self.tileColors[idx] = self.possibleColors[1]; 
            }else{
                self.tileColors[idx] = self.possibleColors[0]
            }
        }else{
            if(self.initialState[idx] == self.possibleColors[0]){
                self.initialState[idx] = self.possibleColors[1]; 
            }else{
                self.initialState[idx] = self.possibleColors[0]
            }
        }
    },
    setFlipMode(mode){
        self.flipMode = mode ; 
    },
    setTileColors(colors=null){
        if(colors){
            self.tileColors = colors ;
        }else{
            //console.log(self.initialState)
            //console.log(typeof(self.initialState))
            //self.tileColors = cast(self.initialState) ;
            //TODO: should be replaces with above ... above make some errors. 
            for(let i=0; i<self.tileNum; i++){
                self.tileColors[i] = self.initialState[i] ; 
            }
            self.gameStatus = 'notdone' ; 
            self.movesCount = 0 ; 
        }
    },
    setUpNewGame(){
        const possibleColors = colors() ; 
        self.possibleColors = [possibleColors[0], possibleColors[1]] ; 

        //TODO: Mapping between hardness to random flippings
        const randomFlipNumber = Math.floor(Math.random()*(self.tileNum/2)) + 3 ;

        // reset solution 
        self.gameSolution.clear() ; 
        for(var i=0; i< self.widthTileNum*self.heightTileNum; i++){
            self.initialState[i] = possibleColors[0]
        } 
        for(let i=0; i<randomFlipNumber; i++){
            let toBeFlipIDX = Math.floor(Math.random() * self.tileNum);
            self.gameSolution.push(toBeFlipIDX) ; 
            self.flipTiles(toBeFlipIDX, false) ; 
        }
        self.setTileColors() ;  
        self.goodEndFlipCount = randomFlipNumber ;    
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
        get relativeCoordsForMode8(){
            return [[0,0], [1,0], [-1,0], [-1,1],[-1,-1],[1,1],[1,-1], [0,-1], [0,1]]
            // return [0, +1, -1, -self.widthTileNum-1, -self.widthTileNum, -self.widthTileNum+1, +self.widthTileNum-1, +self.widthTileNum, + self.widthTileNum+1]
        },
        get allTheSame(){
            for(let i=1; i<self.tileNum; i++){
                if(self.tileColors[i-1] != self.tileColors[i]){
                    return false ;
                }
            }
            return true ; 
        },
        get tileSize(){
            const w =  Math.floor((self.dims.width-tileMargin*(2*self.widthTileNum+2))/ self.widthTileNum) ;
            const h =  Math.floor((self.dims.height-tileMargin*(2*self.heightTileNum+2))/ self.heightTileNum) ;  
            return w>h ? h : w ;
        }
    }
}) ; 


