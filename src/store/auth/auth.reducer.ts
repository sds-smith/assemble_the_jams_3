import { AnyAction } from "redux"
import { AUTH_ACTION_TYPES } from "./auth.types"

export type AuthState = {
    readonly authSession : string;
    readonly accessToken : string;
}

const INITIAL_STATE: AuthState = {
    authSession: '',
    accessToken: ''
}

export const authReducer = (
    state = INITIAL_STATE, 
    action: AnyAction
) => {
    const { type, payload } = action

    switch(type) {
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