export const colors = {
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
        info: '#f5b958',
        message:{
            error: {
                medium: '#ffefc2',
                high: '#f5b958',
                critical: '#ff4548',
            }, //TODO: Change Categorization of tip and info
            tip: { 
                normal: '#e6ffcc',
                important: '#cbadff',
            },
            info: {
                normal: '#e6ffcc',
                important: '#ffefc2',
            }

        }
    }
}



export const textStyle = {
    fontSize: 20,
    color: colors.light.textFillAreaLight,
    textAlign: 'center'
}