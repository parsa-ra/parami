import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {View, Text, TouchableHighlight} from "react-native" ; 
import {colors, textStyle} from "../styles/styles" ; 
import {gameName, version} from "../env" ; 

export const HomeScreen = observer((props)=>(
    <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <Text style={{
            fontSize: 35,
            color: colors.light.primary,
            textAlign: 'center',
            marginTop: 60,      
        }}>
             Logo {"\n"}
             {gameName}
        </Text>

        <View style={{
            alignItems: 'stretch',
        }}>
            <View>
                <TouchableHighlight  style={{
                    backgroundColor: colors.light.primary,
                    padding: 15,
                    borderRadius: 6, 
                    margin: 10,
                }} onPress={()=>(props.rootStore.setNavStack('game'))} >
                    <Text style={[
                        {
                            fontSize: 25,
                            textAlign: 'center',
                            color: colors.light.textColor,
                        }
                    ]}>
                        New Game
                    </Text>
                </TouchableHighlight>
            </View>

            <View>
                <TouchableHighlight  style={{
                    backgroundColor: colors.light.secondary,
                    padding: 15,
                    borderRadius: 6, 
                    margin: 10,
                }} onPress={()=>(props.rootStore.setNavStack('game'))} >
                    <Text style={[
                        {
                            fontSize: 25,
                            textAlign: 'center',
                            color: colors.light.textColor,
                        }
                    ]}>
                        Pick Were You Left
                    </Text>
                </TouchableHighlight>
            </View>

            <View>
                <TouchableHighlight  style={{
                    backgroundColor: colors.light.trinary,
                    padding: 15,
                    borderRadius: 6, 
                    margin: 10,
                }} onPress={()=>(props.rootStore.setNavStack('setting'))} >
                    <Text style={[
                        {
                            fontSize: 25,
                            textAlign: 'center',
                            color: colors.light.textColor,
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
                color: "#dedede",
                textAlign: 'center'
            }}>
                Parami®{"\n"} Version: {version} 
            </Text>
        </View>
    </View>
)); 