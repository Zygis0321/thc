import { Player } from "../../services/player-service";
import { UpdatePlayersAction, UPDATE_PLAYERS } from "./player-types";

const initialState: Player[] = []

export function playersReducer(
    state = initialState,
    action: UpdatePlayersAction

): Player[] {
    switch(action.type){
        case UPDATE_PLAYERS:
            return action.payload
        default:
            return state
    }
}