import {StyleSheet, Text, View, Image, TouchableHighlight, ImagePropTypes, Platform} from "react-native"
import {observer} from "mobx-react-lite" 
import React from "react" 
import {tileMargin} from "../env" ; 

const tileInternalRatio = 1/3 ; 

export const Tile = observer((props)=>(
    <View style={[
        {
            borderRadius: 4, 
            backgroundColor: props.store.tileColors[props.index], //Important
            //borderWidth: 1, 
            //borderColor: '#dddddd',
            width:  props.store.tileSize, 
            height: props.store.tileSize,
            padding: 0 ,
            margin: tileMargin,
        }
    ]}>
        <TouchableHighlight style={[{
            flex: 1
        }]} onPress={()=>{props.store.onTileClicked(props.index);
                          props.store.flipTiles(props.index);
                          props.store.updateState()}}>
            <View style={{
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center',  
                          flex: 1, 
                        }
                        }>
{/* 
                    <Text>
                        {props.index} 
                    </Text> */}

                {props.store.viewSolution ? //TODO: better way to access the mobx.array type elements
                (props.store.gameSolution.toJSON().includes(props.index)) ? 
                    <View style={{
                        backgroundColor: '#121245',                    
                        width: Math.floor(tileInternalRatio*props.store.tileSize), 
                        height: Math.floor(tileInternalRatio*props.store.tileSize),
                        borderRadius: 3, 
                    }}> 
                    
                    </View>
                : null
                :null} 
                
            </View>
        </TouchableHighlight>
    </View>
)); 