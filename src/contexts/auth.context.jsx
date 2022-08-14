import { createContext, useState } from "react";

export const AuthContext = createContext({
    authSession : null,
    setAuthSession : () => null,
    accessToken : null,
    setAccessToken : () => null,
    userLoading : null,
    setUserLoading : () => null,
    currentUser : null,
    setCurrentUser : () => null,
})

export const AuthProvider = ({children}) => {
    const [authSession, setAuthSession] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [userLoading, setUserLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const value = { 
                    authSession,
                    setAuthSession,
                    accessToken,
                    setAccessToken,
                    userLoading,
                    setUserLoading,
                    currentUser, 
                    setCurrentUser 
                }

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}