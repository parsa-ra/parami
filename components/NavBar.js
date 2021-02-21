import { View, TouchableHighlight, Image, Text } from "react-native";
import React from "react" ; 
import {observer} from 'mobx-react-lite'
import {colors} from "../styles/styles" 
import {tileMargin} from "../env" 

const backIcon = require("../assets/Back.png") ; 

export const NavBar = observer((props)=>(
  <View style={{
    flexDirection: "row" ,
    justifyContent: "flex-start",
    //position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // minHeight: 100,
    marginBottom: 10, 
    backgroundColor: colors.light.fillArea,
    alignSelf: 'stretch',
    minWidth: props.store.tileSize * props.store.widthTileNum, 
    //minWidth: props.store.tileSize * (props.store.widthTileNum + 2*tileMargin) ,
  }}>
    <TouchableHighlight style={{
    }} onPress={()=>props.rootStore.setNavStack()}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        borderRadius: 2,
      }}> 
        <Image source={backIcon}style={{
            width: 40,
            height: 40,
            tintColor: colors.light.primary,
        }}/>
        <Text style={{
            color: colors.light.primary,
            fontSize: 20, 
        }}>
            Back
        </Text>
      </View>
    </TouchableHighlight>
  </View>
)) ; 
    