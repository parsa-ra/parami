import {InfoBar,GameScreenModal, Tile, NavBar,ControlBar, ConversationModal} from "../components/" ; 
import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {ActivityIndicator, View} from "react-native" ; 
import {colors} from "../styles/styles" ; 

export const GameScreen = observer((props)=>(
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-between',
      //alignItems: 'stretch', 
      margin: 0,
      padding: 0,
      flex: 1,
      //height: props.store.dims.height, // No effect ... 
    }}>
      
      { props.rootStore.messageView &&
      <ConversationModal store={props.store} rootStore={props.rootStore}/>
      }
      
      <GameScreenModal store={props.store}/>
      <NavBar rootStore={props.rootStore} store={props.store}/>
      <View style={
        {flexDirection: 'column',
         padding: 0,
         margin: 0,
        }}>
        <InfoBar store={props.store} />
        <ControlBar store={props.store} rootStore={props.rootStore}/>
      </View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
      }}> 
      {props.store.gameCreateStatus == 'success' ? [...Array(props.store.heightTileNum).keys()].map(height_idx => (
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
      )) : <ActivityIndicator size='large' color={colors.light.primary} /> }
      </View>

      <View style={{
      }}>
        
      </View>
    </View>
    )
) ; 