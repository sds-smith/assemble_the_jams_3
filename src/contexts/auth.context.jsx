import { createContext, useReducer } from "react";

export const AuthContext = createContext({
    authSession : null,
    setAuthSession : () => null,
    accessToken : null,
    setAccessToken : () => null,
})

export const AUTH_ACTION_TYPES = {
    SET_AUTH_SESSION : 'SET_AUTH_SESSION',
    SET_ACCESS_TOKEN : 'SET_ACCESS_TOKEN'
}

const authReducer = (state, action) => {
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
            throw new Error(`Unhandled type ${type} in authReducer`)
    }
}

const INITIAL_STATE = {
    authSession: '',
    accessToken: ''
}

export const AuthProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(authReducer, INITIAL_STATE)

    const { authSession, accessToken } = state

    const setAuthSession = (session) => {
        dispatch({
            type: AUTH_ACTION_TYPES.SET_AUTH_SESSION,
            payload: session
        })
    }

    const setAccessToken = (token) => {
        dispatch({
            type: AUTH_ACTION_TYPES.SET_ACCESS_TOKEN,
            payload: token
        })
    }

    const value = { 
                    authSession,
                    setAuthSession,
                    accessToken,
                    setAccessToken,
                }

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}