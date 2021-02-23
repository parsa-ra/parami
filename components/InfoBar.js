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
      backgroundColor: colors[props.colorScheme].fillAreaDark,
      //borderWidth: 3,
      borderRadius: 3,
      justifyContent: 'center', 
      alignItems: 'center', 
      flexWrap: 'wrap',
      alignSelf: 'stretch',
      alignContent: 'center',
      //borderColor: '#aaaaaa'
    }}>


      <View  style={{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        //adjustsFontSizeToFit: true,
        padding: 10}}>
        <Text style={{
            color: colors[props.colorScheme].textFillAreaLight,
            fontSize: 20,
            textAlign: 'center',
            flexWrap: 'wrap', 
            flexShrink: 1,
        }}> Moves: {props.store.movesCount} </Text>
      </View>


    </View>
  ));