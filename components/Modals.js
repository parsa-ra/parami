import React, { useState, useEffect, useRef } from "react" ; 
import {observer} from "mobx-react-lite" ; 
import { Animated, View, Text, Modal, TouchableHighlight } from "react-native";
import {colors} from "../styles/styles" ; 
import { uniformIntTo} from "../Functions/Utils" ; 
import { set } from "react-native-reanimated";
import {messages} from "../components/Messages"
import {randomPickFromCurrentNode} from "../Functions/Utils" ;


const NotificationConstructor = (props) => {
    if(props.store.viewSolution){
        return <Text  
        style={{
            fontSize: 20,
            color: colors[props.rootStore.colorScheme].textFillAreaLight,
            textAlign: 'center'
        }}>
            {randomPickFromCurrentNode(messages.gameScreen.endGame.whenSolutionIsOn)} 
        </Text>
    }
    else{
    if(props.playerMoveCount > props.goodEndFlipCount){
        return <Text 
        style={{
            fontSize: 20,
            color: colors[props.rootStore.colorScheme].textFillAreaLight,
            textAlign: 'center'
        }}> 
            {randomPickFromCurrentNode(messages.gameScreen.endGame.worseThanExpected)}
         </Text>         
        
    }else if(props.playerMoveCount == props.goodEndFlipCount){
        return <Text 
        style={{
            fontSize: 20,
            color: colors[props.rootStore.colorScheme].textFillAreaLight,
            textAlign: 'center'
        }}> {randomPickFromCurrentNode(messages.gameScreen.endGame.asExpected)} </Text>         

    }else{
        return <Text 
        style={{
            fontSize: 20,
            color: colors[props.rootStore.colorScheme].textFillAreaLight,
            textAlign: 'center'
        }}> {randomPickFromCurrentNode(messages.gameScreen.endGame.betterThanExpected)}  </Text>             
    }
}
}


export const ConversationModal = observer((props)=>{

    const topPosition = useRef(new Animated.Value(-200)).current ; 
    const colorHierarchy = props.rootStore.notificationQueue[props.rootStore.currentNotificationIdx].type.split('.') ; 

    useEffect(()=>{
        Animated.timing(
            topPosition,
            {
                toValue: 30,
                duration: 600,
                useNativeDriver: true,
            }
        ).start();
    }, [topPosition]) ; 

    return  <Animated.View style={{
            position: 'absolute',
            zIndex: 1,
            top: topPosition,
            left: 10,
            right: 10, 
            backgroundColor: colors[props.rootStore.colorScheme].message[colorHierarchy[0]][colorHierarchy[1]] ,
            borderRadius: 4,
            padding: 10, 
            flex: 1 ,
            }}
            >

            <Text style={{
                color: colors[props.rootStore.colorScheme].textFillAreaColor,
                textAlign: 'left',
                flexWrap: 'wrap',
                fontSize: 20,

            }}>
                {props.rootStore.notificationQueue[props.rootStore.currentNotificationIdx].message}
            </Text>

    </Animated.View>

});





export const GameScreenModal = observer((props)=>(
    props.store.gameStatus == 'done' ? 
    <View style={{
        zIndex: 2,
        position: 'absolute',
        left: 0,
        right: 0 ,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(140,140,140,0.8)'
    }}>
    <View
            style={{
                zIndex: 3,
                backgroundColor: colors[props.colorScheme].fillArea,
                position: 'absolute',
                left: 5, 
                top: Math.floor(props.store.dims.height/4),
                bottom: Math.floor(props.store.dims.height/4),
                right: 5,
                padding: 20,
                borderRadius: 4, 
            }}>
        <View style={{flex:1,
                      flexDirection: 'column',
                      alignItems:'center',
                      justifyContent: 'space-evenly',
                      adjustsFontSizeToFit: true 
                      }}>


            <NotificationConstructor playerMoveCount={props.store.movesCount}  goodEndFlipCount={props.store.initialSolution.length} store={props.store} rootStore={props.rootStore}/>


            <View style={{
                flexDirection: 'row',
                justifyContent: "space-evenly"
            }}>           
                    <TouchableHighlight onPress={()=>{props.store.setTileColors()}}> 
                        <View style={{
                            backgroundColor: colors[props.colorScheme].trinary,
                            borderRadius: 4,
                            padding:10,
                            margin:10,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: colors[props.colorScheme].textColor,
                                padding: 10,
                            }}>
                                Try Again
                            </Text>
                        </View>
                    </TouchableHighlight>      

                    <TouchableHighlight onPress={()=>{props.store.setUpNewGame()}}> 
                        <View style={{
                            backgroundColor: colors[props.colorScheme].primary,
                            borderRadius: 4,
                            padding:10,
                            margin: 10,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: colors[props.colorScheme].textColor,
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


