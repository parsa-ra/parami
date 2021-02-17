import {HexRandColor, HexColorDistance, HexChannelWiseDistance} from "./Color" ;

const colorDistanceThreshold = 10000 ; // This distance set empirically to generate better distinctive colors.
const perChannelDistanceThreshold = 100 ; 


export const colors = (method="perChannel") => {
    const color1 = HexRandColor() ;
    var color2 = HexRandColor() ; 
    var trials = 1 ; 
    while(true){
        //var trials = 1 ; messageView

        if(method == "perChannel"){
            // Not more than 2 channel have the same distance, this will mimic the Value in HSV color system
            // In which colors may be different but only in their values
            let channelDistances = HexChannelWiseDistance(color1, color2) ; 
            let numChannelSatisfyCondition = 0 ; 
            //console.log(channelDistances);  
            channelDistances.forEach((channelDistance)=>{
                if(channelDistance > perChannelDistanceThreshold){
                    numChannelSatisfyCondition += 1; 
                }
            }) ; 

            if(numChannelSatisfyCondition == 2){
                console.log(`Color Distance Condition Reached after ${trials} Trials, 
                Number of distinct channels ${numChannelSatisfyCondition}`) ; 
                break ; 
            }else{ 
                color2 = HexRandColor() ; 
                trials += 1 ; 
            }

        }else{
            if(HexColorDistance(color1, color2) > colorDistanceThreshold){
                console.log(`Color Distance Condition Reached after ${trials} Trials`) ; 
                break; 
            }else{
                color2 = HexRandColor() ; 
                trials += 1 ; 
            } 
        }
    }
    return [color1, color2]
}


//TODO: Replace Math.round() with something like "Mersenne Twister" 
export const uniformIntTo = (limit) => {
    return Math.floor(Math.random()*limit) ; 
}


export const timeout = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))} ; 