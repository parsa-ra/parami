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
    initialSolution: types.array(types.number),

    difficulty: types.enumeration(['Easy', 'Medium', 'Hard']),

    resetHitCount: types.optional(types.number, 0),
    enableSolution: types.optional(types.boolean, true),
    viewSolution: types.optional(types.boolean, false),

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
                    //console.log(idx) ; 
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
    },
    onTileClicked(idx){
        // if(self.viewSolution){
        //     //TODO: Must be replaced with something else for performance concerns.
        //     if(!(self.gameSolution.toJSON().includes(idx))){
        //         // //TODO: Display some cools things to user ... for example, "At least try a bit ... "
        //         self.gameSolution.push(idx) ;
        //     }
        // }

        // Maybe in some features mode the state isn't reversible meaning when you double flip a tile the state wouldn't be the same as before flipping

        // TODO: Notify user in first few times that the solution is shown for current table in it's current state, if you want to see the solution for the original table just reset the table and then click on the view solution button. 
        if(self.gameSolution.toJSON().includes(idx)){
            // //TODO: Display some cools things to user ... for example, "At least try a bit ... "
            self.gameSolution.splice(self.gameSolution.indexOf(idx), 1) ; 
        }else{
            self.gameSolution.push(idx) ;
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
        self.viewSolution = false ;
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
            console.log(self.initialSolution) ; 
            self.gameSolution = cast(self.initialSolution.toJSON()) ; 
            self.movesCount = 0 ; 
        }
    },
    resetSolution(){
        self.viewSolution = false ; 
        self.resetHitCount = 0 ; 
    },
    setUpNewGame(){
        let conditionIterationNewGame = 1 ; 
        self.resetSolution() ; 
    
        var possibleColors = colors() ; 
        self.possibleColors = [possibleColors[0], possibleColors[1]] ; 
        while(true){ // Iteration over Satisfying Game Condition ...      
            
            //TODO: Add some sense to difficulty 
            var flipRatio2TotalTile ; 
            var minFlip2TotalTile ; 
            switch(self.difficulty){
                case 'Easy':
                    flipRatio2TotalTile = (1/4) ; 
                    minFlip2TotalTile = (1/8)
                case 'Medium':
                    flipRatio2TotalTile = (2/4) ; 
                    minFlip2TotalTile = (2/8) ; 
                case 'Hard' : 
                    flipRatio2TotalTile = (3/4) ;
                    minFlip2TotalTile = (3/8) 

            }
            var randomFlipNumber = Math.floor(Math.random()*(self.tileNum * flipRatio2TotalTile) + self.tileNum * minFlip2TotalTile) ;

            // reset solution 
            self.gameSolution.clear() ; 
            for(var i=0; i< self.widthTileNum*self.heightTileNum; i++){
                self.initialState[i] = possibleColors[0]
            } 
            for(let i=0; i<randomFlipNumber; i++){
                let toBeFlipIdx = Math.floor(Math.random() * self.tileNum);
                self.gameSolution.push(toBeFlipIdx) ; 
                self.flipTiles(toBeFlipIdx, false) ; 
            }

            // Counting Appearance of each tile number
            var eachTileFlipCount = {} ; 
            for(let i=0; i<self.gameSolution.length ; i++){
                if(eachTileFlipCount[self.gameSolution[i]]){
                    eachTileFlipCount[self.gameSolution[i]] += 1 ;
                }else{
                    eachTileFlipCount[self.gameSolution[i]] = 1 ;
                }
            }
            
            self.gameSolution = [] ; 
            for(let key in eachTileFlipCount){
                if(eachTileFlipCount[key] % 2 == 1){
                    self.gameSolution.push(Number(key)) ; 
                }
            }
            // Making Sure Something Flipped
            if(self.gameSolution.length != 0){
                console.log(`New Game Condition Reached After ${conditionIterationNewGame} Trials`) ; 
                break; 
            }else{
                conditionIterationNewGame += 1 ; 
            }
        }

        self.initialSolution = cast(self.gameSolution.toJSON()) ;
        self.setTileColors() ;  
        self.goodEndFlipCount = randomFlipNumber ;    
    },
    setResetHitCount(value){
        self.resetHitCount = value ; 
    },
    toggleViewSolution(){
        self.viewSolution = !self.viewSolution ; 
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
            const h =  Math.floor((self.dims.height*(2/3)-tileMargin*(2*self.heightTileNum+2))/ self.heightTileNum) ;  
            return w>h ? h : w ;
        },
        get viewSolutionControl(){
            if(self.enableSolution && self.resetHitCount >= 3){
                return true;
            }
            return false; 
        }
    }
}) ; 


