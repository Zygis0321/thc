import { Player } from "../../services/player-service";

export const UPDATE_PLAYERS = 'UPDATE_PLAYERS'

export interface UpdatePlayersAction {
    type: typeof UPDATE_PLAYERS
    payload: Player[]
}