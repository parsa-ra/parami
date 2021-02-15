import React from "react" ; 
import {observer} from "mobx-react-lite" ; 
import { View, Text, TouchableHighlight} from "react-native";
import {colors} from "../styles/styles" ; 


export const ControlBar = observer((props)=>(
    <View style={{
      flexDirection: 'row',
      marginBottom: 20, 
      backgroundColor: colors.light.fillAreaDark,
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
                        backgroundColor: colors.light.message.high,
                        borderRadius: 4,
                        padding:10,
                        margin:10,
                        adjustsFontSizeToFit: true 
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: colors.light.textColor,
                            padding: 5,
                        }}>
                            ?
                        </Text>
                    </View>
        </TouchableHighlight>  
        :
        null 
        }

        <TouchableHighlight onPress={()=>{props.store.setTileColors() ;
                                          props.store.setResetHitCount(props.store.resetHitCount+1)}}> 
            <View style={{
                backgroundColor: colors.light.secondary,
                borderRadius: 4,
                padding:10,
                margin:10,
                adjustsFontSizeToFit: true 
            }}>
                <Text style={{
                    fontSize: 20,
                    color: colors.light.textColor,
                    padding: 5,
                }}>
                    Reset
                </Text>
            </View>
      </TouchableHighlight>  


      <TouchableHighlight onPress={()=>{props.store.setUpNewGame()}}> 
            <View style={{
                backgroundColor: colors.light.primary,
                borderRadius: 4,
                padding:10,
                margin:10,
                adjustsFontSizeToFit: true, 
            }}>
                <Text style={{
                    fontSize: 20,
                    color: colors.light.textColor,
                    padding: 5,
                }}>
                    New Game
                </Text>
            </View>
      </TouchableHighlight>  
    </View>
  ));