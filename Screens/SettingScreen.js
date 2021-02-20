import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {View, Text, TouchableHighlight, ScrollView, StyleSheet, StatusBarm, Image} from "react-native" ; 
import {NavBar} from "../components/NavBar" ; 
import {colors} from "../styles/styles" ; 
import {GameStore} from "../models/GameStore"
import { messages } from "../components/Messages";
import {ConversationModal} from "../components/Modals" ; 
import {randomPickFromCurrentNode} from "../Functions/Utils" ; 

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
        margin: 5, 
    }
})

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
            borderColor: colors.light.fillAreaDark,
            borderWidth: 5,
            backgroundColor: colors.light.fillArea,
            borderRadius: 10, 
            margin: 10,
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
            backgroundColor: colors.light.fillAreaDark, 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            padding: 3,
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

        <View style={{
            flex:1,
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'center',
        }}>
            
        <ControlButt store={props.store} displayText="-" ident={props.ident} value={props.value-1}/>

        <View style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
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
        backgroundColor: colors.light.fillArea ,
        borderRadius: 5,
        borderColor: props.modeName == props.store.flipMode ? colors.light.primary : colors.light.fillAreaDark,
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
                    color: props.modeName == props.store.flipMode ? colors.light.primary : colors.light.textFillAreaLightest,
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

const Tickable = observer((props)=>{
    console.log(typeof props.pressHandler) ; 
    return <View style={{
        flexDirection: 'column',
    }}> 
        <Text style={[styles.settingHeader]}>
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
                    borderColor: colors.light.fillAreaDark,
                    height: 30,
                    width: 30,
                    margin: 5,
                }} >
                <View style={{
                    backgroundColor: props.enabled ? colors.light.primary : colors.light.fillArea,
                    flex: 1,
                }}>

                </View>
                </View>

                <Text style={[styles.settingDescription, {
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
        backgroundColor: colors.light.fillArea,
    }} onPress={props.pressHandler}>
        <View style={{
            justifyContent: 'flex-start',
            padding: 5, 
        }}>
            <Text style={[styles.settingHeader]}>
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
                <View style={   // Nested ScrollView not working really well in some phones .
                    {
                    backgroundColor: colors.light.fillAreaDark,
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
                            
                            <ModeItem modeName={item.value} store={props.store} key={item.value}/>
                            
                        ))
                    }

                </View>


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
                        <MultiSelectItem diffName={item.value} store={props.store} key={item.value}/>
                    )) }
                </View>               
                {/*<View style={[styles.horizontalLine]}/>*/}


                <Text style={[styles.settingHeader]}>
                    Tile Count
                </Text> 
                <Text style={[styles.settingDescription]}>
                    How many tiles do you want to appear in your screen?
                </Text>
                <View style={[styles.horizontalLine]}/>
                
                <ValueController store={props.store} name=" Width Tiles Number" ident="width" value={props.store.widthTileNum}/>
                <ValueController store={props.store} name=" Height Tiles Number" ident="height" value={props.store.heightTileNum}/>

                <View style={[styles.horizontalLine]}/>
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
                enabled={props.rootStore.enabledConversationMode}/>



                {/*                 
                <View style={[styles.horizontalLine]}/>
                <SettingButt Name=""/> */}

                <View style={[styles.horizontalLine]}/>
                <SettingButt  Name="Open Source Licenses"/>


                <View style={[styles.horizontalLine]}/>
                <SettingButt Name="About" pressHandler={()=>props.rootStore.setNavStack("about")}/>

                

            </ScrollView>
    </View>
)); 