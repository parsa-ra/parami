import React from "react" ; 
import {observer} from "mobx-react-lite" ; 
import { View, Text, TouchableHighlight} from "react-native";
import {colors} from "../styles/styles" ; 

const fontStyle = {
    
}

export const InfoBar = observer((props)=>(
    <View style={{
      flexDirection: 'row',
      marginBottom: 20, 
      backgroundColor: colors.light.fillArea,
      //borderWidth: 3,
      borderRadius: 3,
      //borderColor: '#aaaaaa'
    }}>
        <TouchableHighlight onPress={()=>{props.store.setTileColors()}}> 
            <View style={{
                backgroundColor: colors.light.secondary,
                borderRadius: 4,
                padding:10,
                margin:10,
            }}>
                <Text style={{
                    fontSize: 20,
                    color: colors.light.textColor,
                    padding: 5,
                    adjustsFontSizeToFit: true 
                }}>
                    Reset
                </Text>
            </View>
      </TouchableHighlight>  
      <View  style={{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10}}>
        <Text style={{
            color: colors.light.textFillAreaColor,
            fontSize: 20,
            textAlign: 'center',
            flexWrap: 'wrap',
            adjustsFontSizeToFit: true, 
        }}> Moves: {props.store.movesCount} </Text>
      </View><TouchableHighlight onPress={()=>{props.store.setUpNewGame()}}> 
            <View style={{
                backgroundColor: colors.light.primary,
                borderRadius: 4,
                padding:10,
                margin:10,
            }}>
                <Text style={{
                    fontSize: 20,
                    color: colors.light.textColor,
                    padding: 5,
                    adjustsFontSizeToFit: true, 
                }}>
                    New Game
                </Text>
            </View>
      </TouchableHighlight>  
    </View>
  ));