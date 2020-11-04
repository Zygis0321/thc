import { PlayersActionTypes, PlayersState, UPDATE_PLAYERS, UPDATE_PLAYERS_STATE } from "./player-types";

const initialState: PlayersState = {
    players: [],
    prefScores: []
}

export function playersReducer(
    state = initialState,
    action: PlayersActionTypes

): PlayersState {
    switch(action.type){
        case UPDATE_PLAYERS:
            return{
                ...state,
                players: action.payload
            }
        case UPDATE_PLAYERS_STATE:
            return action.payload
        default:
            return state
    }
}