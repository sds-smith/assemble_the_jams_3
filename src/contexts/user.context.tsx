import { createContext, useState, FC } from "react";
import { UserContextProps, ProviderProps, CurrentUserType } from "../utils/context.utils";

export const defaultCurrentUser = {
    display_name: '',
    image_url: '',
    id: ''
}

export const UserContext = createContext<UserContextProps>({
    userLoading : false,
    setUserLoading : () => {},
    currentUser : defaultCurrentUser,
    setCurrentUser : () => {},
    defaultCurrentUser,
    currentUserExists : () => false
})

export const UserProvider: FC<ProviderProps> = ({children}) => {
    const [userLoading, setUserLoading] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<CurrentUserType>(defaultCurrentUser)

    const currentUserExists = () => {
        return currentUser.display_name.length > 0
    }

    const value = { 
                    userLoading,
                    setUserLoading,
                    currentUser, 
                    setCurrentUser,
                    currentUserExists,
                    defaultCurrentUser
                }

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}