import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {View, Text, TouchableHighlight, ScrollView, StyleSheet, StatusBar} from "react-native" ; 
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

const ControlButt = observer((props)=>(
    <TouchableHighlight style={{
        flex:1,
        margin: 10,
        borderColor: colors.light.fillAreaDark,
        borderWidth: 5,
        backgroundColor: colors.light.fillArea,
        borderRadius: 5, 
    }}
    onPress={()=>{props.store.setTileCount(props.ident, props.value)}}>
        <View style={{
            justifyContent: 'center',
        }}>
            <Text style={{
                fontSize: 20,
                textAlign: 'center',
            }}>
                {props.displayText} 
            </Text>
        </View> 
    </TouchableHighlight>
)) ; 

const ValueController = observer((props)=>(
    <View style={
        {
            margin: 5,
            flexDirection: 'row',
            flex: 1, 
            backgroundColor: colors.light.fillAreaDark, 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
        }
    }>
        <Text style={{
            textAlign: 'left',
            fontSize: 20, 
            color: colors.light.textFillAreaLightest,
        }
        }>
            {props.name} : 
        </Text>

        <ControlButt store={props.store} displayText="-" ident={props.ident} value={props.value-1}/>

        <View style={{
            flex:2,
        }}>
            <Text style={{
                textAlign: 'center',
                fontSize: 20,             
            }}>
                {props.value} 
            </Text>
        </View>

        <ControlButt store={props.store} displayText="+" ident={props.ident} value={props.value+1}/>

    </View>

));

const ModeItem = observer((props)=>(
    <TouchableHighlight style={{
        alignItems: 'center',
    }}
    onPress={()=>props.store.setFlipMode(props.modeName)}>
        <View style={
            {margin: 2, 
            backgroundColor: colors.light.fillArea ,
            borderRadius: 5,
            borderColor: props.modeName == props.store.flipMode ? colors.light.primary : colors.light.fillAreaDark,
            borderWidth: props.modeName == props.store.flipMode ? 3 : 0
        }
        }>
            <Text style={{
                fontSize: 15, 
                color: props.modeName == props.store.flipMode ? colors.light.primary : colors.light.textFillAreaLightest,
                textAlign: 'center',
                padding: 10, 
            }}>
                {props.modeName} {"\n"}
                Image + Description

            </Text>
        </View> 
    </TouchableHighlight>
));


const DiffItem = observer((props)=>(
    <TouchableHighlight style={{
        alignItems: 'center',
        margin: 4,
    }}
    onPress = {()=>props.store.setDifficulty(props.diffName)}>
        <View style={
            {margin: 2, 
            borderRadius: 5,
            backgroundColor: colors.light.fillArea ,
            borderColor: props.diffName == props.store.difficulty ? colors.light.primary : colors.light.fillAreaDark,
            borderWidth: props.diffName == props.store.difficulty ? 3 : 0
        }
        }>
            <Text style={{
                fontSize: 20, 
                color: props.diffName == props.store.difficulty ? colors.light.primary : colors.light.textFillAreaLightest ,
                textAlign: 'center',
                padding: 10,
            }}>
                {props.diffName} 
            </Text>
        </View> 
    </TouchableHighlight>
));


export const SettingScreen = observer((props)=>(
    <View style={{
        flexDirection: 'column',
        flex:1,
        alignItems: 'stretch',
        //paddingTop: StatusBar.currentHeight, 
    }}>
            <NavBar store={props.rootStore.store} rootStore={props.rootStore}/>
            <ScrollView style={{
                flex: 1,
                flexDirection: 'column',
                margin: 10,
            }}>

            <Text style={[styles.settingDescription]}>
                    By creating a New Game from Home Screen your settings will be applied automatically.
            </Text>


            <Text style={[styles.settingHeader]}>
                    Modes
                </Text>
                <Text style={[styles.settingDescription]}>
                    Change How the flipping occurs.
                </Text>
                <View style={[styles.horizontalLine]}/>
                <ScrollView style={
                    {
                    backgroundColor: colors.light.fillAreaDark,
                    flexDirection: 'column',
                    flex: 1,
                    borderRadius: 6,
                    margin: 4,
                    maxHeight: Math.floor(props.store.dims.height/3),
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

                <View   style={{
                    flexDirection:'row', 
                    flex: 1, 
                    backgroundColor: colors.light.fillAreaDark,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    //flexWrap: 'wrap',
                    borderRadius: 6,
                    margin: 4,
                }}>
                    { GameStore.properties.difficulty._types.map(item => (
                        <DiffItem diffName={item.value} store={props.store} key={item.value}/>
                    )) }
                </View>               
                <View style={[styles.horizontalLine]}/>


                <Text style={[styles.settingHeader]}>
                    Tile Count
                </Text> 
                <Text style={[styles.settingDescription]}>
                    How many tiles do you want to appear in your screen?
                </Text>
                <View style={[styles.horizontalLine]}/>
                
                <ValueController store={props.store} name="Width Tiles Number" ident="width" value={props.store.widthTileNum}/>
                <ValueController store={props.store}name="Height Tiles Number" ident="height" value={props.store.heightTileNum}/>
                
            </ScrollView>
    </View>
)); 