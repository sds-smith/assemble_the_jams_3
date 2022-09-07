import { createContext, useState } from "react";

export const UserContext = createContext({
    userLoading : null,
    setUserLoading : () => null,
    currentUser : null,
    setCurrentUser : () => null,
})

export const UserProvider = ({children}) => {
    const [userLoading, setUserLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const value = { 
                    userLoading,
                    setUserLoading,
                    currentUser, 
                    setCurrentUser 
                }

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}