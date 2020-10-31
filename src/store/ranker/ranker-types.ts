import { PlayerRanked } from "../../services/player-service";

export const UPDATE_RANKER_STATE = 'UPDATE_RANKER_STATE'

export interface RankerState {
    playersCompare: PlayerRanked[] 
    selectedLevel: string,
    bottomNavVal: number
}

interface UpdateRankerStateAction {
    type: typeof UPDATE_RANKER_STATE
    payload: RankerState
}

export type RankerActionTypes = 
    | UpdateRankerStateAction