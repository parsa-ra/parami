import React from "react" ; 
import {observer} from "mobx-react-lite" ;
import {View, Text, TouchableHighlight, ScrollView, StyleSheet, StatusBarm, Image} from "react-native" ; 
import {colors} from "../styles/styles" ; 
import {NavBar} from "../components/NavBar" ; 

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

export const AboutScreen = observer((props)=> (
    <View style={{
        flex: 1,
        padding: 5,
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
    }}> 
        <NavBar rootStore={props.rootStore} store={props.store}/>

        <Text style={[styles.settingHeader]}>
            About Us
        </Text>
        <Text style={[styles.settingDescription]}> {/* TODO:Add Linking */}
            Game is Developed By Parsa & Amir {"\n"}
            Support us by buying the premium version. {"\n"}
            Contact Us: Parsa.rahimi.n@gmail.com {"\n"}
        </Text>

    </View>
));