import { createContext, useState, FC } from "react";
import { UserContextProps, ProviderProps, CurrentUserType } from "../utils/context.utils";

export const UserContext = createContext<UserContextProps>({
    userLoading : null,
    setUserLoading : () => null,
    currentUser : null,
    setCurrentUser : () => null,
})

export const UserProvider: FC<ProviderProps> = ({children}) => {
    const [userLoading, setUserLoading] = useState<boolean | null>(false)
    const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null)

    const value = { 
                    userLoading,
                    setUserLoading,
                    currentUser, 
                    setCurrentUser 
                }

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}