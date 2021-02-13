import {StyleSheet, Text, View, Image, TouchableHighlight, ImagePropTypes, Platform} from "react-native"
import {observer} from "mobx-react-lite" 
import React from "react" 
import {tileMargin} from "../env" ; 


export const Tile = observer((props)=>(
    <View style={[
        {
            borderRadius: 4, 
            backgroundColor: props.store.tileColors[props.index], //Important
            //borderWidth: 1, 
            //borderColor: '#dddddd',
            minWidth:  props.store.tileSize, 
            minHeight: props.store.tileSize,
            margin: tileMargin,
        }
    ]}>
        <TouchableHighlight style={[{
            flex: 1
        }]} onPress={()=>{props.store.flipTiles(props.index);
                          props.store.updateState()}}>
            <View> 
                
            </View>
        </TouchableHighlight>
    </View>
)); 