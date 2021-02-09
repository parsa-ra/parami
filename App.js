import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {RootStore} from "./models/Store" ;
import {Tile} from "./components/Tile" ; 
import {window, screen} from "./env" ;
import {autorun} from "mobx" 
import {HexRandColor, HexColorDistance} from "./Functions/Color" ;
import {observer} from "mobx-react-lite" ; 

//const color1 = '#35a492' ; 
//const color2 ='#12a0df' ; 
const colorDistanceThreshold = 8000 ; 
const color1 = HexRandColor() ;
var color2 = HexRandColor() ; 
while(true){
  let trial = 1 ; 
  if(HexColorDistance(color1, color2) > colorDistanceThreshold){
    console.log(`Condition Reached after ${trial} Trials`) ; 
    break; 
  }else{
    color2 = HexRandColor() ; 
    trial += 1 ; 
  } 
}

//TODO: Generate Some random tile counts 
const width = 5 ;
const height = 5 ;

//TODO: Generating Solvable initialColor
var initialTileColors = []
for(var i=0; i< width*height; i++){
  initialTileColors.push(color1) ; 
}
console.log(initialTileColors)

const store = RootStore.create({
  possibleColors: [color1, color2], 
  movesCount: 0,
  flipMod: '4',
  widthTileNum: width,
  heightTileNum: height,
  edgeHandling: 'None',
  tileColors: initialTileColors,
  gameStatus: 'notdone',
}) ; 


const InfoBar = observer((props)=>(
  <View style={{
    flexDirection: 'row',
    marginBottom: 20, 
    backgroundColor: '#efefefef',
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#aaaaaa'
  }}>
    <View  style={{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'}}>
      <Text> {props.store.movesCount} </Text>
    </View>
  </View>
));


autorun(()=>{
    console.log(store.tileColors) ; 
}) ; 


export default function App() {

  const [dimensions, setDimensions] = useState({ window, screen });
  
  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
    store.dims.setWidthHeight(window.width, window.height) ;
    //store.setOrientation() ;  
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });


  return (
    <View style={[styles.container, {
      flexDirection: 'column',
    }]}>
      <InfoBar store={store} />

      {[...Array(store.heightTileNum).keys()].map(height_idx => (
        <View style={[
          {flexDirection: 'row'}
          ]}>
          {[...Array(store.widthTileNum).keys()].map(width_idx =>
          <Tile index={store.widthTileNum* (height_idx) + width_idx} store={store}/>
          )
          }
        </View>
      )
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
