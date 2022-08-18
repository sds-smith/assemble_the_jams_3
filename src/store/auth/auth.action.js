
import { AUTH_ACTION_TYPES } from "./auth.types"

export const setClientToken = (token) => {
    return {
        type: AUTH_ACTION_TYPES.SET_CLIENT_TOKEN,
        payload: token
    }
}

export const setAuthSession = (session) => {
    return {
        type: AUTH_ACTION_TYPES.SET_AUTH_SESSION,
        payload: session
    }
}

export const setAccessToken = (token) => {
    return {
        type: AUTH_ACTION_TYPES.SET_ACCESS_TOKEN,
        payload: token
    }
}