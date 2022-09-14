
import { AUTH_ACTION_TYPES } from "./auth.types"
import { ActionWithPayload } from "../../utils/reducer.utils"

export const setClientToken = (token: string):
    ActionWithPayload<AUTH_ACTION_TYPES.SET_CLIENT_TOKEN, string> => 
{
    return {
        type: AUTH_ACTION_TYPES.SET_CLIENT_TOKEN,
        payload: token
    }
}
export const setAuthSession = (session: string): 
    ActionWithPayload<AUTH_ACTION_TYPES.SET_AUTH_SESSION, string> => 
{
    return {
        type: AUTH_ACTION_TYPES.SET_AUTH_SESSION,
        payload: session
    }
}

export const setAccessToken = (token: string):
    ActionWithPayload<AUTH_ACTION_TYPES.SET_ACCESS_TOKEN, string> => 
{
    return {
        type: AUTH_ACTION_TYPES.SET_ACCESS_TOKEN,
        payload: token
    }
}

export const setRefreshToken = (token: string):
    ActionWithPayload<AUTH_ACTION_TYPES.SET_REFRESH_TOKEN, string> => 
{
    return {
        type: AUTH_ACTION_TYPES.SET_REFRESH_TOKEN,
        payload: token
    }
}

export const setExpiresAt = (expires_at: number):
    ActionWithPayload<AUTH_ACTION_TYPES.SET_EXPIRES_AT, number> => 
{
    return {
        type: AUTH_ACTION_TYPES.SET_EXPIRES_AT,
        payload: expires_at
    }
}