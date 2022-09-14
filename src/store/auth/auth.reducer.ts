import { AnyAction } from "redux"
import { AUTH_ACTION_TYPES } from "./auth.types"

// you will need to install redux deep persist, blacklist clientToken in root reducer

export type AuthState = {
    readonly clientToken : string;
    readonly authSession : string;
    readonly accessToken : string;
}

const INITIAL_STATE: AuthState = {
    clientToken: '',
    authSession: '',
    accessToken: ''
}

export const authReducer = (
    state = INITIAL_STATE, 
    action: AnyAction
) => {
    const { type, payload } = action

    switch(type) {
        case AUTH_ACTION_TYPES.SET_CLIENT_TOKEN :
            return {
                ...state,
                clientToken : payload
            }
        case AUTH_ACTION_TYPES.SET_AUTH_SESSION :
            return {
                ...state,
                authSession : payload
            }
        case AUTH_ACTION_TYPES.SET_ACCESS_TOKEN :
            return {
                ...state,
                accessToken : payload
            }
        default : 
            return state
    }
}