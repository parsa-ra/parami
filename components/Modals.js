import React from "react" ; 
import {observer} from "mobx-react-lite" ; 
import { View, Text, Modal, TouchableHighlight } from "react-native";
import {colors, textStyle} from "../styles/styles" ; 


const newLine = "~{'\n'}"

const NotificationConstructor = (props) => {
    if(props.playerMoveCount > props.goodEndFlipCount){
        return <Text 
        style={{
            ...textStyle
        }}> You Done It, But it can be solved with fewer moves want to try again? {"\n"}
        Or you can start new game </Text>         
        
    }else if(props.playerMoveCount == props.goodEndFlipCount){
        return <Text 
        style={{
            ...textStyle
        }}> Congrats, Try a new game. {"\n"} We think your moves was as few as possible </Text>         

    }else{
        return <Text 
        style={{
            ...textStyle
        }}> Wow, just Wow, your moves was fewer than our expectations, 
        {"\n"} Consider applying for NASA or something ...  </Text>             
    }
}

export const GameScreenModal = observer((props)=>(
    props.store.gameStatus == 'done' ? 
    <View style={{
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0 ,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(140,140,140,0.8)'
    }}>
    <View
            style={{
                zIndex: 2,
                backgroundColor: colors.light.fillArea,
                position: 'absolute',
                left: 5, 
                top: Math.floor(props.store.dims.height/4),
                bottom: Math.floor(props.store.dims.height/4),
                right: 5,
                padding: 20,
                borderRadius: 4, 
                // borderColor: '#aeaeee',
                // borderWidth: 3
            }}>
        <View style={{flex:1,
                      flexDirection: 'column',
                      alignItems:'center',
                      justifyContent: 'space-evenly',
                      adjustsFontSizeToFit: true 
                      }}>

            <NotificationConstructor playerMoveCount={props.store.movesCount}  goodEndFlipCount={props.store.goodEndFlipCount}/>


            <View style={{
                flexDirection: 'row',
                justifyContent: "space-evenly"
            }}>           
                    <TouchableHighlight onPress={()=>{props.store.setTileColors()}}> 
                        <View style={{
                            backgroundColor: colors.light.trinary,
                            borderRadius: 4,
                            padding:10,
                            margin:10,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: colors.light.textColor,
                                padding: 10,
                            }}>
                                Try Again
                            </Text>
                        </View>
                    </TouchableHighlight>      

                    <TouchableHighlight onPress={()=>{props.store.setUpNewGame()}}> 
                        <View style={{
                            backgroundColor: colors.light.primary,
                            borderRadius: 4,
                            padding:10,
                            margin: 10,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: colors.light.textColor,
                                padding: 10,
                            }}>
                                New Game
                            </Text>
                        </View>
                    </TouchableHighlight>    
            </View>
        </View>
    </View>
    </View>
    : null 
)); 