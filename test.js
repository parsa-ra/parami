
const colors = {
    light: {
        primary: '#327191',
        secondary: '#229476',
        trinary: '#44a2e2',
        fillArea: '#fafafa',
        fillAreaDark: '#eaeaea',
        fillAreaDarkest: '#d1d1d1',
        textFillAreaColor: '#323232' ,
        textFillAreaLight: '#868686' ,
        textFillAreaLightest: '#9a9a9a', 
        textColor: '#fefefe',
        message:{
            error: {
                medium: '#ffefc2',
                high: '#f5b958',
                critical: '#ff4548',
            }, //TODO: Change Categorization of tip and info
            tip: { 
                normal: '#e6ffcc'
            },
            info: {
                normal: '#e6ffcc'
            }

        }
    }
}

// var test = [] ; 
// for(var mc in colors.light.message){
//     for(var typec in colors.light.message[mc]){
//         test.push(mc + '.' +typec) ; 
//     }
// }
// console.log(test) ; 

// const timeout = (ms) => {return new Promise((resolve,reject)=>{setTimeout(()=>{console.log("Promise Fullfilled")}, ms)})} ;
// async function testOrder(){
//     console.log("Before Promise Statement") ; 
//     await timeout(5000) ; 
//     console.log("After Promise Statement") ; 
// } ; 

//TODO: Replace Math.round() with something like "Mersenne Twister" 
const uniformIntTo = (limit) => {
    return Math.floor(Math.random()*limit) ; 
}

const timeout = (ms, timeOutHandler) => {return new Promise((resolve, reject) => {
    timeOutHandler = setTimeout(resolve, ms)
})} ; 

const randomPickFromCurrentNode = (node) => {
    let keys = Object.keys(node) ; 
    return node[keys[uniformIntTo(keys.length)]] ; 
}

//console.log(colors.light) ; 
console.log(randomPickFromCurrentNode(colors.light));