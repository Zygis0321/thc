export function getColorByName(name: string):string{
    let red:number=213874;
    let green:number=736452;
    let blue:number=432654;
    let mod:number=1000000007
    let p1 = 1242;
    let p2 = 5432;
    let p3 = 1435;
    let x1 = 1;
    let x2 = 1;
    let x3 = 1;
    for(let i=0; i<name.length; i++){
        
        red+=name.charCodeAt(i)*x1
        green+=name.charCodeAt(i)*x2
        blue+=name.charCodeAt(i)*x3

        red%=mod
        green%=mod
        blue%=mod

        x1=x1*p1%mod
        x2=x2*p2%mod
        x3=x3*p3%mod
    }

    red= 30 + red%150
    green= 30 + green%150
    blue= 205 + blue%50
    return `rgb(${red},${green},${blue})`

}