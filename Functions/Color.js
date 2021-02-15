
const hexColorAlphabet = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'] ; 
const hexColorAlphaLen = hexColorAlphabet.length ; 
export function HexRandColor(){
    var randColor = "#" ; 
    for(let i=0; i<6; i++ ){
        randColor += hexColorAlphabet[Math.floor(Math.random()* hexColorAlphaLen)] ; 
    }
    return randColor  
}

export function Hex2RGB(col1){
    let r = 16 * hexColorAlphabet.indexOf(col1[1]) +  hexColorAlphabet.indexOf(col1[2]) ; 
    let g = 16 * hexColorAlphabet.indexOf(col1[3]) +  hexColorAlphabet.indexOf(col1[4]) ;
    let b = 16 * hexColorAlphabet.indexOf(col1[5]) +  hexColorAlphabet.indexOf(col1[6]) ; 
    return [r, g, b]
}

export function RandColorRGB(){
    return 
}

export function HexColorDistance(col1, col2){
    let col1RGB = Hex2RGB(col1) ; 
    let col2RGB = Hex2RGB(col2) ;
    return ((col1RGB[0]-col2RGB[0]) ** 2 + (col1RGB[1]-col2RGB[1])**2 + (col1RGB[2]-col2RGB[2])**2 )
}

export function HexChannelWiseDistance(col1, col2){
    let col1RGB = Hex2RGB(col1) ;
    let col2RGB = Hex2RGB(col2) ; 
    return [Math.abs(col1RGB[0]-col2RGB[0]), Math.abs(col1RGB[1]-col2RGB[1]), Math.abs(col1RGB[2]-col2RGB[2])] ;
}
