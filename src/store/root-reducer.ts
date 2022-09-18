import { combineReducers } from "redux";
import { authReducer } from "./auth/auth.reducer";
import { trackReducer } from "./track/track.reducer";
import { userReducer } from "./user/user.reducer";
import { playerReducer } from "./player/player.reducer";

export const rootReducer = combineReducers({
    auth : authReducer,
    track : trackReducer,
    user : userReducer,
    player : playerReducer
})