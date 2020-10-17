import { combineReducers } from "redux";
import { playersReducer } from "./players/player-reducers";

const rootReducer = combineReducers({
    players: playersReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
