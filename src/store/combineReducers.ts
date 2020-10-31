import { combineReducers } from "redux";
import { playersReducer } from "./players/player-reducers";
import { rankerReducer } from "./ranker/ranker-reducers";

const rootReducer = combineReducers({
    players: playersReducer,
    ranker: rankerReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
