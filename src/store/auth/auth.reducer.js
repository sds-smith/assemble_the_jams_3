
import { AUTH_ACTION_TYPES } from "./auth.types"

const INITIAL_STATE = {
    clientToken: '',
    authSession: '',
    accessToken: ''
}

export const authReducer = (state=INITIAL_STATE, action) => {
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