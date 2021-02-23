import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {View, Text, TouchableHighlight, ScrollView, StyleSheet, StatusBarm, Image} from "react-native" ; 
import {colors} from "../styles/styles" ; 
import {NavBar} from "../components/NavBar" ; 
import {styles} from "../env" ; 


export const AboutScreen = observer((props)=> (
    <View style={{
        flex: 1,
        padding: 5,
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
    }}> 
        <NavBar rootStore={props.rootStore} store={props.store}/>

        <Text style={{...styles('settingHeader', props.rootStore.colorScheme)}}>
            About Us
        </Text>
        <Text style={{...styles('settingDescription', props.rootStore.colorScheme)}}> {/* TODO:Add Linking */}
            Game is Developed By Parsa & Amir {"\n"}
            Support us by buying the premium version. {"\n"}
            Contact Us: Parsa.rahimi.n@gmail.com {"\n"}
        </Text>

    </View>
));