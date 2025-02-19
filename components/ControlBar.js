import React from "react" ; 
import {observer} from "mobx-react-lite" ; 
import { View, Text, TouchableHighlight} from "react-native";
import {colors} from "../styles/styles" ; 

import {messages} from "../components/Messages"


export const ControlBar = observer((props)=>(
    <View style={{
      flexDirection: 'row',
      marginBottom: 20, 
      backgroundColor: colors[props.rootStore.colorScheme].fillAreaDark,
      //borderWidth: 3,
      borderRadius: 3,
      justifyContent: 'center', 
      alignItems: 'center', 
      flexWrap: 'wrap',
      alignSelf: 'stretch',
      alignContent: 'center',
      //borderColor: '#aaaaaa'
    }}>

        
        {
        props.store.viewSolutionControl ? 
        <TouchableHighlight onPress={()=>{ props.store.toggleViewSolution() 
                                            }}> 
                    <View style={{
                        backgroundColor: colors[props.rootStore.colorScheme].info,
                        borderRadius: 4,
                        padding:10,
                        margin:10,
                        adjustsFontSizeToFit: true 
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: colors[props.rootStore.colorScheme].textColor,
                            padding: 5,
                        }}>
                            ?
                        </Text>
                    </View>
        </TouchableHighlight>  
        :
        null 
        }

        <TouchableHighlight onPress={()=>{
            props.store.setResetHitCount(props.store.resetHitCount+1)
            props.store.setTileColors() ;
            }}> 
            <View style={{
                backgroundColor: colors[props.rootStore.colorScheme].secondary,
                borderRadius: 4,
                padding:10,
                margin:10,
                adjustsFontSizeToFit: true 
            }}>
                <Text style={{
                    fontSize: 20,
                    color: colors[props.rootStore.colorScheme].textColor,
                    padding: 5,
                }}>
                    Reset
                </Text>
            </View>
      </TouchableHighlight>  


      <TouchableHighlight onPress={()=>{props.store.setUpNewGame()}}> 
            <View style={{
                backgroundColor: colors[props.rootStore.colorScheme].primary,
                borderRadius: 4,
                padding:10,
                margin:10,
                adjustsFontSizeToFit: true, 
            }}>
                <Text style={{
                    fontSize: 20,
                    color: colors[props.rootStore.colorScheme].textColor,
                    padding: 5,
                }}>
                    New Game
                </Text>
            </View>
      </TouchableHighlight>  
    </View>
  ));