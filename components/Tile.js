import {StyleSheet, Text, View, Image, TouchableHighlight, ImagePropTypes, Platform} from "react-native"
import {observer} from "mobx-react-lite" 
import {autorun} from "mobx" ; 
import React, {useEffect, useRef, useState} from "react" 
import {tileMargin} from "../env" ; 
import {Hex2RGB} from "../Functions/Color"
import Animated, { color } from "react-native-reanimated";

const tileInternalRatio = 1/3 ; 

export const Tile = observer((props)=>{

    // const [loaded, setLoaded] = useState(false) ; 

    // const rgb1 = Hex2RGB(props.store.possibleColors[0]) ; 
    // const rgb2 = Hex2RGB(props.store.possibleColors[1]) ; 
    // var cc ; //current color
    // const animateTime = 1000 ;
    
    // var colorRange = useRef(new Animated.Value(props.store.tileColors[props.index] == props.store.possibleColors[0] ? 0 : 1).interpolate({
    //     inputRange: [0,1], 
    //     //outputRange: [`rgb(${rgb1[0]},${rgb1[1]},${rgb1[2]})`, `rgb(${rgb2[0]}, ${rgb2[1]}, ${rgb2[2]})`]
    //     outputRange: ["rgb(10,20,30)", "rgb(200,190,180)"],
    //     //outputRange: [10, 30]
    // }) 
    // ).current ;
    
    // var toggleColor = (value) => {
    //     //console.log(value) ; 
    //     Animated.timing(colorRange, {
    //         toValue: value,
    //         duration: animateTime
    //     }).start() ; 
    // };
    
    
    // useEffect(()=>{
    //     //useEffect(()=> {
    //     if(props.store.tileColors[props.index] == props.store.possibleColors[0]){
    //         cc = 0 ; 
    //     }else{
    //         cc = 1 ;
    //     }

    //     setLoaded(true) ;
         
    // }, []) ; 

    
    //console.log(colorRange) ; 
    return <Animated.View style={[
        {
            borderRadius: 4, 
            backgroundColor: props.store.tileColors[props.index], //Important   colorRange 
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
        }]} onPress={()=>{
                          //props.store.tileColors[props.index] == props.store.possibleColors[0] ? toggleColor(1) : toggleColor(0) ;
                          props.store.onTileClicked(props.index);
                          props.store.flipTiles(props.index);
                          props.store.updateState()
                          }}>
            <View style={{
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center',  
                          flex: 1, 
                        }
                        }>
                            
                {/* <Text>
                    {props.index} 
                    </Text>  */}

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
    </Animated.View> 
}); 