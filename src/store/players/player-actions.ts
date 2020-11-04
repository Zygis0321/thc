import { Player } from "../../services/player-service";
import { PlayersActionTypes, PlayersState, UPDATE_PLAYERS, UPDATE_PLAYERS_STATE } from "./player-types";

export function updatePlayers(newPlayers: Player[]): PlayersActionTypes{
    return {
        type: UPDATE_PLAYERS,
        payload: newPlayers
    }
}
export function updatePlayersState(playersState: PlayersState): PlayersActionTypes{
    return {
        type: UPDATE_PLAYERS_STATE,
        payload: playersState
    }
}