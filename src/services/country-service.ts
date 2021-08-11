import countryCodes from '../data/countryCodes.json'
import { Player } from './player-service'

export interface CountryCode{
    name: string; 
    alpha2code: string;
}

export function getCountry(nation: string): CountryCode{
    let ret = countryCodes.find(country => country.fifa===nation)
    if(ret===undefined){
        return {
            name:"Not Found",
            alpha2code:"_empty",
        }
    }
    return {
        name: ret.name,
        alpha2code: ret.a2
    }
}
