import { Player } from "../../services/player-service";

export const UPDATE_PLAYERS = 'UPDATE_PLAYERS'
export const UPDATE_PLAYERS_STATE = 'UPDATE_PLAYERS_STATE'

export interface PlayersState {
    players: Player[],
    prefScores: number[]
}

interface UpdatePlayersStateAction {
    type: typeof UPDATE_PLAYERS_STATE
    payload: PlayersState
}

interface UpdatePlayersAction {
    type: typeof UPDATE_PLAYERS
    payload: Player[]
}

export type PlayersActionTypes = 
    | UpdatePlayersStateAction
    | UpdatePlayersAction