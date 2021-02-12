import {InfoBar, GameScreenModal, Tile, NavBar} from "../components/" ; 
import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {View} from "react-native" ; 

export const GameScreen = observer((props)=>(
    <View style={{
      justifyContent: 'space-between',
      alignItems: 'stretch', 
      flex: 1,
      //height: props.store.dims.height, // No effect ... 
    }}>
      <GameScreenModal store={props.store}/>
      <NavBar rootStore={props.rootStore} store={props.store}/>
      <View style={{
        justifyContent: 'center',
        flex: 10,
        alignItems: 'center',
        marginBottom: 30,
      }}>
      <InfoBar store={props.store} />
      {[...Array(props.store.heightTileNum).keys()].map(height_idx => (
        <View style={[
          {flexDirection: 'row'}
          ]}
          key={
            height_idx
          }>
          {[...Array(props.store.widthTileNum).keys()].map(width_idx =>
          <Tile index={props.store.widthTileNum* (height_idx) + width_idx} store={props.store} key={height_idx*props.store.widthTileNum + width_idx}/>
          )
          }
        </View>
      ))}
      </View>
      <View style={{
        flex:1, 
      }}>
        
      </View>
    </View>
    )
) ; 