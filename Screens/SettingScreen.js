import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {View, Text, TouchableHighlight, ScrollView, StyleSheet} from "react-native" ; 
import {NavBar} from "../components/NavBar" ; 
import {colors} from "../styles/styles" ; 
import {GameStore} from "../models/GameStore"

const styles = StyleSheet.create({
    settingHeader:{
        textAlign: 'left',
        color: colors.light.textFillAreaLight,
        fontSize: 25, 
    },
    settingDescription:{
        textAlign: 'left',
        color: colors.light.textFillAreaLightest,
        flexWrap: 'wrap',
        fontSize: 15,
    },
    horizontalLine:{
        borderTopWidth: 1,
        borderTopColor: colors.light.textFillAreaLight,
        margin: 2, 
    }
})

const ModeItem = observer((props)=>(
    <TouchableHighlight style={{
        alignItems: 'center',
    }}>
        <View style={
            {margin: 2, 
            backgroundColor: colors.light.fillAreaDark ,
            borderColor: props.modeName == props.store.flipMode ? colors.light.primary : colors.light.fillAreaDark,
            borderWidth: props.modeName == props.store.flipMode ? 3 : 0
        }
        }>
            <Text style={{
                fontSize: 15, 
                fontColor: colors.light.textFillAreaLightest,
                textAlign: 'center',
            }}>
                {props.modeName} {"\n"}
                Image + Description

            </Text>
        </View> 
    </TouchableHighlight>
));

export const SettingScreen = observer((props)=>(
    <View style={{
        flexDirection: 'column',
        flex:'1',
        alignItems: 'stretch',
    }}>
        <NavBar store={props.store} rootStore={props.rootStore}/>
        <View>
        <Text style={[styles.settingHeader]}>
                Modes
            </Text>
            <Text style={[styles.settingDescription]}>
                Change How the flipping occurs.
            </Text>
            <View style={[styles.horizontalLine]}/>
            <ScrollView style={
                {minHeight: Math.floor(props.store.dims.height/2),
                backgroundColor: colors.light.fillArea,
                flexDirection: 'column',
                borderRadius: 4,
                margin: 2,
                //alignItems: 'center',
            } 
            }>
                {
                    GameStore.properties.flipMode._types.map(item => (
                        <ModeItem modeName={item.value} store={props.store} key={item.value}/>
                    ))
                }

            </ScrollView>


            <Text style={[styles.settingHeader]}>
                Difficulty
            </Text>
            <Text style={[styles.settingDescription]}>
                How perplexing the solution do you want to be?
            </Text>
            <View style={[styles.horizontalLine]}/>
            <Text style={[styles.settingHeader]}>
                Tile Count
            </Text> 
            <Text style={[styles.settingDescription]}>
                How many tiles do you want to appear in your screen?
            </Text>
            <View style={[styles.horizontalLine]}/>
        </View>
    </View>
)); 