import { levelList } from "../../data/scorecalc-data";
import { RankerActionTypes, RankerState, UPDATE_RANKER_STATE } from "./ranker-types";

const initialState: RankerState = {
    playersCompare: [],
    selectedLevel: levelList[0].name,
    bottomNavVal: 1
}

export function rankerReducer(
    state = initialState,
    action: RankerActionTypes

): RankerState {
    switch(action.type){
        case UPDATE_RANKER_STATE:
            return action.payload
        default:
            return state
    }
}