import { Player } from "../../services/player-service";
import { UpdatePlayersAction, UPDATE_PLAYERS } from "./player-types";

export function updatePlayers(newPlayers: Player[]): UpdatePlayersAction{
    return {
        type: UPDATE_PLAYERS,
        payload: newPlayers
    }
}