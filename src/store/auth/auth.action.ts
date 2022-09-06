
import { AUTH_ACTION_TYPES } from "./auth.types"
import { ActionWithPayload } from "../../utils/reducer.utils" 


export const setAuthSession = (session: string): ActionWithPayload<AUTH_ACTION_TYPES.SET_AUTH_SESSION, string> => {
    return {
        type: AUTH_ACTION_TYPES.SET_AUTH_SESSION,
        payload: session
    }
}

export const setAccessToken = (token: string): ActionWithPayload<AUTH_ACTION_TYPES.SET_ACCESS_TOKEN, string> => {
    return {
        type: AUTH_ACTION_TYPES.SET_ACCESS_TOKEN,
        payload: token
    }
}