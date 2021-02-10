import {HexRandColor, HexColorDistance} from "./Color" ;

export const colors = () => {
    const colorDistanceThreshold = 10000 ; // This distance set empirically to generate better distinctive colors.
    const color1 = HexRandColor() ;
    var color2 = HexRandColor() ; 
    while(true){
    let trial = 1 ; 
    if(HexColorDistance(color1, color2) > colorDistanceThreshold){
        console.log(`Color Distance Condition Reached after ${trial} Trials`) ; 
        break; 
    }else{
        color2 = HexRandColor() ; 
        trial += 1 ; 
    } 
    }
    return [color1, color2]
}