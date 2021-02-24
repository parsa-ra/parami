import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {autorun} from "mobx"
import {View, Text, TouchableHighlight, ScrollView, StyleSheet, StatusBarm, Image} from "react-native" ; 
import {NavBar} from "../components/NavBar" ; 
import {colors} from "../styles/styles" ; 
import {GameStore} from "../models/GameStore"
import { messages } from "../components/Messages";
import {ConversationModal} from "../components/Modals" ; 
import {randomPickFromCurrentNode} from "../Functions/Utils" ; 
import { RootStore } from "../models/RootStore";



const styles = (type, colorScheme) => {
    if(type == 'settingHeader'){
        return {
            textAlign: 'left',
            color: colors[colorScheme].textFillAreaLight,
            fontSize: 25, 
        }
    }else if(type == 'settingDescription'){
        return {
            textAlign: 'left',
            color: colors[colorScheme].textFillAreaLightest,
            flexWrap: 'wrap',
            fontSize: 15,
        }
    }else if(type == 'horizontalLine'){
        return {borderTopWidth: 1,
        borderTopColor: colors[colorScheme].textFillAreaLight,
        margin: 5
        }
    }

}

const modeDescription = (modeName) => {
    switch(modeName){
        case '4':
            return "All tiles in plus like shape will be flipped" ; 
        case '8':
            return "All tiles in surrounding square will be flipped"
    }
}

const ControlButt = observer((props)=>(
    <TouchableHighlight style={{
        flex:1,
    }}
    onPress={()=>{props.store.setTileCount(props.ident, props.value)}}>
        <View style={{
            justifyContent: 'center',
            borderColor: colors[props.colorScheme].fillAreaDark,
            borderWidth: 5,
            backgroundColor: colors[props.colorScheme].fillArea,
            borderRadius: 10, 
            margin: 10,
        }}>
            <Text style={{
                fontSize: 20,
                textAlign: 'center',
                color: colors[props.colorScheme].textFillAreaLight,
            }}>
                {props.displayText} 
            </Text>
        </View> 
    </TouchableHighlight>
)) ; 

// const modeNames = {
//     '4':"../assets/4.gif" ,  
//     '8':"../assets/8.gif" 
// } 

const modeNames = (modeName)=>{
    switch(modeName){
        case '4':
            return "../assets/4.gif" ;
        case '8':
            return "../assets/8.gif" ; 
    }
}

const ValueController = observer((props)=>(
    <View style={
        {
            margin: 3,
            flexDirection: 'row',
            flex: 1, 
            backgroundColor: colors[props.colorScheme].fillAreaDark, 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            padding: 3,
        }
    }>
        <Text style={{
            textAlign: 'left',
            fontSize: 20, 
            color: colors[props.colorScheme].textFillAreaLightest,
        }
        }>
            {props.name} : 
        </Text>

        <View style={{
            flex:1,
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'center',
        }}>
            
        <ControlButt store={props.store} displayText="-" ident={props.ident} value={props.value-1} colorScheme={props.colorScheme}/>

        <View style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{
                textAlign: 'center',
                fontSize: 20,      
                color: colors[props.colorScheme].textFillAreaLight,       
            }}>
                {props.value} 
            </Text>
        </View>

        <ControlButt store={props.store} displayText="+" ident={props.ident} value={props.value+1} colorScheme={props.colorScheme}/>
        </View>

    </View>

));

const ImageModeItem = (props) => {
    console.log(typeof props.modeName) ; 
    console.log(props.modeName == "8") ;
    switch(props.modeName){
        case props.modeName == "4":
            return <Image source={require(`../assets/4.gif`)} style={{
                width: 50,
                height: 50,
                resizeMode: 'cover',
            }}/>
        case props.modeName == "8":
            return <Image source={require(`../assets/8.gif`)} style={{
                width: 50,
                height: 50,
                resizeMode: 'cover',
            }}/>
    }
    return <Image source={require(`../assets/8.gif`)} style={{
        width: 50,
        height: 50,
        resizeMode: 'cover',
    }}/>
}

const ModeItem = observer((props)=>(
    <TouchableHighlight style={{
        alignItems: 'center',
        flexDirection: 'row',
        margin: 4, 
        backgroundColor: colors[props.colorScheme].fillArea ,
        borderRadius: 5,
        borderColor: props.modeName == props.store.flipMode ? colors[props.colorScheme].primary : colors[props.colorScheme].fillAreaDark,
        borderWidth: props.modeName == props.store.flipMode ? 3 : 0,
        justifyContent: 'flex-start',
    }}
    onPress={()=>props.store.setFlipMode(props.modeName)}>
        <View style={{
            flexDirection: 'row',
            margin: 5, 
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap', 
            padding: 5,
        }
        }>
            {/* <ImageModeItem modeName={props.modeName}/> */}
            {
                props.modeName == '4' ? 
                <Image source={require(`../assets/4.gif`)} style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                }}/> :
                <Image source={require(`../assets/8.gif`)} style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                }}/>

            }

            <View style={{
                flexDirection: 'row',
                flex:1
            }}>
                <Text style={{
                    fontSize: 15, 
                    color: props.modeName == props.store.flipMode ? colors[props.colorScheme].primary : colors[props.colorScheme].textFillAreaLightest,
                    textAlign: 'left',
                    padding: 10, 
                    flexWrap: 'wrap',
                }}>
                    {props.modeName} {"\n"}
                    {modeDescription(props.modeName)}
                </Text>
            </View>
        </View> 
    </TouchableHighlight>
));


const MultiSelectItem = observer((props)=>(
    <TouchableHighlight style={{
        alignItems: 'center',
        margin: 4,
    }}
    onPress = {()=>props.onPressHandler(props.value)}>
        <View style={
            {margin: 2, 
            borderRadius: 5,
            backgroundColor: colors[props.colorScheme].fillArea ,
            borderColor: props.value == props.currentValue ? colors[props.colorScheme].primary : colors[props.colorScheme].fillAreaDark,
            borderWidth: props.value == props.currentValue ? 3 : 0
        }
        }>
            <Text style={{
                fontSize: 20, 
                color: props.value == props.currentValue ? colors[props.colorScheme].primary : colors[props.colorScheme].textFillAreaLightest ,
                textAlign: 'center',
                padding: 10,
            }}>
                {props.value} 
            </Text>
        </View> 
    </TouchableHighlight>
));

const Tickable = observer((props)=>{
    console.log(typeof props.pressHandler) ; 
    return <View style={{
        flexDirection: 'column',
    }}> 
        <Text style={{...styles('settingHeader', props.colorScheme)}}>
            {props.Header}
        </Text>

        <TouchableHighlight style={{
            flex: 1, 
        }}  onPress={() => {props.pressHandler()}}>
            <View style={{
                flex:1,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row', 
            }}>
                <View style={{
                    borderRadius: 5,
                    borderWidth: 3,
                    borderColor: colors[props.colorScheme].fillAreaDark,
                    height: 30,
                    width: 30,
                    margin: 5,
                }} >
                <View style={{
                    backgroundColor: props.enabled ? colors[props.colorScheme].primary : colors[props.colorScheme].fillArea,
                    flex: 1,
                }}>

                </View>
                </View>

                <Text style={[{...styles('settingDescription', props.colorScheme)}, {
                    flex: 1,
                    textAlignVertical: 'center',
                }]}>
                {props.Description}
                </Text>
            </View> 
        </TouchableHighlight>

    </View>
});

const SettingButt = observer((props) => (
    <TouchableHighlight style={{
        flexDirection: 'row',
        margin: 5,
        backgroundColor: colors[props.colorScheme].fillArea,
        borderRadius: 5, 
    }} onPress={props.pressHandler}>
        <View style={{
            justifyContent: 'flex-start',
            padding: 5, 
            paddingLeft: 10, 
        }}>
            <Text style={{...styles('settingHeader', props.colorScheme)}}>
                {props.Name}
            </Text>
        </View>
    </TouchableHighlight>
)) ; 

export const SettingScreen = observer((props)=>(
    <View style={{
        flexDirection: 'column',
        flex:1,
        alignItems: 'stretch',
        //paddingTop: StatusBar.currentHeight, 
    }}>

            { props.rootStore.messageView &&
            <ConversationModal store={props.store} rootStore={props.rootStore}/>
            }

            <NavBar store={props.rootStore.store} rootStore={props.rootStore}/>
            <ScrollView style={{
                flex: 1,
                flexDirection: 'column',
                margin: 10,
            }}>

            <Text style={{...styles('settingDescription',props.rootStore.colorScheme)}}>
                    By creating a New Game from Home Screen your settings will be applied automatically.
            </Text>


            <Text style={{...styles('settingHeader', props.rootStore.colorScheme)}}>
                    Modes
                </Text>
                <Text style={{...styles('settingDescription',props.rootStore.colorScheme)}}>
                    Change How the flipping occurs.
                </Text>
                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>
                <View style={   // Nested ScrollView not working really well in some phones .
                    {
                    backgroundColor: colors[props.rootStore.colorScheme].fillAreaDark,
                    flexDirection: 'column',
                    flex: 1,
                    borderRadius: 6,
                    margin: 4,
                    //maxHeight: Math.floor(props.store.dims.height/3),
                    padding: 5,
                    //alignItems: 'center',
                } 
                }>
                    {
                        GameStore.properties.flipMode._types.map(item => (
                            
                            <ModeItem modeName={item.value} store={props.store} key={item.value} colorScheme={props.rootStore.colorScheme}/>
                            
                        ))
                    }

                </View>


                <Text style={{...styles('settingHeader', props.rootStore.colorScheme)}}>
                    Difficulty
                </Text>
                <Text style={{...styles('settingDescription',props.rootStore.colorScheme)}}>
                    How perplexing the solution do you want to be?
                </Text>
                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>

                <View   style={{
                    flexDirection:'row', 
                    flex: 1, 
                    backgroundColor: colors[props.rootStore.colorScheme].fillAreaDark,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    //flexWrap: 'wrap',
                    borderRadius: 6,
                    margin: 4,
                }}>
                    { GameStore.properties.difficulty._types.map(item => (
                        <MultiSelectItem value={item.value} store={props.store} key={item.value}
                        onPressHandler={props.rootStore.store.setDifficulty} currentValue={props.store.difficulty} colorScheme={props.rootStore.colorScheme} />
                    )) }
                </View>               
                {/* <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/> */}

                
                <Text style={{...styles('settingHeader', props.rootStore.colorScheme)}}>
                    Color Scheme
                </Text>
                <Text style={{...styles('settingDescription',props.rootStore.colorScheme)}}>
                    Set your preferred color scheme, scientifically speaking neither is good for your eyes XD.
                </Text>
                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>

                <View   style={{
                    flexDirection:'row', 
                    flex: 1, 
                    backgroundColor: colors[props.rootStore.colorScheme].fillAreaDark,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    //flexWrap: 'wrap',
                    borderRadius: 6,
                    margin: 4,
                }}>
                    { RootStore.properties.colorScheme._types.map(item => (
                        <MultiSelectItem value={item.value} store={props.store} key={item.value}
                        onPressHandler={props.rootStore.setColorScheme} currentValue={props.rootStore.colorScheme} colorScheme={props.rootStore.colorScheme}/>
                    )) }
                </View>  



                <Text style={{...styles('settingHeader', props.rootStore.colorScheme)}}>
                    Edge Handling
                </Text>
                <Text style={{...styles('settingDescription',props.rootStore.colorScheme)}}>
                    Suppose you tap on a tile at the edge of the screen, how do you want the tiles beyond the edges act?
                </Text>
                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>

                <View   style={{
                    flexDirection:'row', 
                    flex: 1, 
                    backgroundColor: colors[props.rootStore.colorScheme].fillAreaDark,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    //flexWrap: 'wrap',
                    borderRadius: 6,
                    margin: 4,
                }}>
                    { GameStore.properties.edgeHandling._types.map(item => (
                        <MultiSelectItem value={item.value} store={props.store} key={item.value}
                        onPressHandler={props.store.setEdgeHandling} currentValue={props.store.edgeHandling} colorScheme={props.rootStore.colorScheme}/>
                    )) }
                </View>  

                <Text style={{...styles('settingHeader', props.rootStore.colorScheme)}}>
                    Tile Count
                </Text> 
                <Text style={{...styles('settingDescription',props.rootStore.colorScheme)}}>
                    How many tiles do you want to appear in your screen?
                </Text>
                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>
                
                <ValueController store={props.store} name=" Width Tiles Number" ident="width" value={props.store.widthTileNum} colorScheme={props.rootStore.colorScheme}/>
                <ValueController store={props.store} name=" Height Tiles Number" ident="height" value={props.store.heightTileNum} colorScheme={props.rootStore.colorScheme}/>

                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>
                <Tickable Header="Conversation Mode" Description="Using this feature, you allow me talk back to your actions." 
                pressHandler={()=>{
                    if(props.rootStore.enabledConversationMode){
                    props.rootStore.pushToNotificationQueue({
                        message: randomPickFromCurrentNode(messages.featureWide.disabling) ,
                        screen: 'setting',
                        timeout: 5000,
                        type: 'info.important'
                    });
                    props.rootStore.toggleConversationMode();
                    }else{
                        props.rootStore.toggleConversationMode() ; 
                        props.rootStore.pushToNotificationQueue({
                            message: randomPickFromCurrentNode(messages.featureWide.enabling) ,
                            screen: 'setting',
                            timeout: 5000,
                            type: 'info.normal'
                        });
                    }
                }}
                enabled={props.rootStore.enabledConversationMode}
                colorScheme={props.rootStore.colorScheme}/>



                {/*                 
                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>
                <SettingButt Name=""/> */}

                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>
                <SettingButt  Name="Open Source Licenses" colorScheme={props.rootStore.colorScheme}/>


                <View style={{...styles('horizontalLine',props.rootStore.colorScheme)}}/>
                <SettingButt Name="About" pressHandler={()=>props.rootStore.setNavStack("about")} colorScheme={props.rootStore.colorScheme}/>

                

            </ScrollView>
    </View>
)); 