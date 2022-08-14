import { createContext, useState } from "react";

export const AuthContext = createContext({
    authSession : null,
    setAuthSession : () => null,
    accessToken : null,
    setAccessToken : () => null,
})

export const AuthProvider = ({children}) => {
    const [authSession, setAuthSession] = useState('')
    const [accessToken, setAccessToken] = useState('')

    const value = { 
                    authSession,
                    setAuthSession,
                    accessToken,
                    setAccessToken,
                }

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}