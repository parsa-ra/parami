import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {View, Text, TouchableHighlight} from "react-native" ; 
import {colors} from "../styles/styles" ; 
import {gameName, version} from "../env" ; 
import { applySnapshot, getSnapshot } from "mobx-state-tree";
import {ConversationModal} from "../components/Modals" ; 

export const HomeScreen = observer((props)=>(
    <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: props.store.tileSize * props.store.widthTileNum,
    }}>
        <Text style={{
            fontSize: 35,
            color: colors[props.rootStore.colorScheme].primary,
            textAlign: 'center',
            marginTop: 60,      
        }}>
             Logo {"\n"}
             {gameName}
        </Text>
     
        {props.rootStore.messageView &&
        <ConversationModal rootStore={props.rootStore} store={props.store} /> 
        }
        <View style={{
            alignItems: 'stretch',
        }}>


            { props.rootStore.totalGamePlayed != 0  ? <View>
                <TouchableHighlight  style={{
                    backgroundColor: colors[props.rootStore.colorScheme].secondary,
                    padding: 15,
                    borderRadius: 6, 
                    margin: 10,
                }} onPress={()=>(props.rootStore.setNavStack('game'))} >
                    <Text style={[
                        {
                            fontSize: 25,
                            textAlign: 'center',
                            color: colors[props.rootStore.colorScheme].textColor,
                        }
                    ]}>
                        Pick Where You Left
                    </Text>
                </TouchableHighlight>
            </View> : 
            null}

            <View>
                <TouchableHighlight  style={{
                    backgroundColor: colors[props.rootStore.colorScheme].primary,
                    padding: 15,
                    borderRadius: 6, 
                    margin: 10,

                }} onPress={()=>{ /* Applying SnapShot of Settings Upon Creation of New Game from Home 
                    Screen */    props.store.setCreateGameState('pending') ; 
                                 applySnapshot(props.rootStore.store, getSnapshot(props.rootStore.toBeAppliedStore)) ;
                                 props.rootStore.setNavStack('game');
                                 props.rootStore.store.setUpNewGame();
                                 }} >
                    <Text style={[
                        {
                            fontSize: 25,
                            textAlign: 'center',
                            color: colors[props.rootStore.colorScheme].textColor,
                        }
                    ]}>
                        New Game
                    </Text>
                </TouchableHighlight>
            </View>

            <View>
                <TouchableHighlight  style={{
                    backgroundColor: colors[props.rootStore.colorScheme].trinary,
                    padding: 15,
                    borderRadius: 6, 
                    margin: 10,
                }} onPress={()=>(props.rootStore.setNavStack('setting'))} >
                    <Text style={[
                        {
                            fontSize: 25,
                            textAlign: 'center',
                            color: colors[props.rootStore.colorScheme].textColor,
                        }
                    ]}>
                        Settings
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
        <View style={{
            marginBottom: 10,
        }}>
            <Text style={{
                fontSize: 10,
                color: colors[props.rootStore.colorScheme].textFillAreaLightest,
                textAlign: 'center'
            }}>
                Parami®{"\n"} Version: {version} 
            </Text>
        </View>
    </View>
)); 