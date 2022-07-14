import { createContext, useState } from "react";

export const UserContext = createContext({
    authSession : null,
    setAuthSession : () => null,
    accessToken : null,
    setAccessToken : () => null,
    currentUser : null,
    setCurrentUser : () => null,
})

export const UserProvider = ({children}) => {
    const [authSession, setAuthSession] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [currentUser, setCurrentUser] = useState(null)

    const value = { 
                    authSession,
                    setAuthSession,
                    accessToken,
                    setAccessToken,
                    currentUser, 
                    setCurrentUser 
                }

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}