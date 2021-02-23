import {Dimensions} from "react-native" 

export const window = Dimensions.get('window') ; 
export const screen = Dimensions.get('screen') ; 
export const appName = "app" ; 

export const gameName = "Parami" ; 
export const version = "0.8" ; 
export const tileMargin = 4 ;   


import {colors} from './styles/styles' ;

export const styles = (type, colorScheme) => {
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