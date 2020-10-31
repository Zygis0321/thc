import { RankerActionTypes, RankerState, UPDATE_RANKER_STATE } from "./ranker-types";

export function updateRankerState(rankerState: RankerState): RankerActionTypes{
    return{
        type: UPDATE_RANKER_STATE,
        payload: rankerState
    }
}