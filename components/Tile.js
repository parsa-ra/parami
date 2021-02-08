import {StyleSheet, Text, View, Image, TouchableHighlight, ImagePropTypes, Platform} from "react-native"
import {observer} from "mobx-react-lite" 
import React from "react" 


export const Tile = observer((props)=>(
    <View style={[
        {
            borderRadius: 3, 
            backgroundColor: props.store.tileColors[props.index],
            borderWidth: 1, 
            borderColor: '#dddddd',
            minWidth: 100, 
            minHeight: 100,
            margin: 1
        }
    ]}>
        <TouchableHighlight style={[{
            flex: 1
        }]} onPress={()=>props.store.flipTiles(props.index)}>
            <View> 
                
            </View>
        </TouchableHighlight>
    </View>
)); 