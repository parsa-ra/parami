import React, { useState, useEffect, useRef } from "react" ; 
import {observer} from "mobx-react-lite" ; 
import {HomeScreen, GameScreen, SettingScreen} from "../Screens"; 
import { Animated, View, Text, Modal, TouchableHighlight } from "react-native";

export const Navigator = observer((props)=>{
    switch(props.rootStore.lastNavEntry){
      case 'home':
        return <HomeScreen rootStore={props.rootStore} store={props.rootStore.store}/>
      case 'game':
        return <GameScreen rootStore={props.rootStore} store={props.rootStore.store}/>
      case 'setting':
        // Note what we pass to the Store... 
        return <SettingScreen rootStore={props.rootStore} store={props.rootStore.toBeAppliedStore}/>
    }
  }) ; 
  ; 