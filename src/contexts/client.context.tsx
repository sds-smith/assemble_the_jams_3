import { createContext, useState, FC } from "react";
import { ClientContextProps, ProviderProps } from "../utils/context.utils";

export const ClientContext = createContext<ClientContextProps>({
    clientToken : '',
    setClientToken : () => null
})

export const ClientProvider: FC<ProviderProps> = ({children}) => {
    const [clientToken, setClientToken] = useState('')

    const value = { 
                    clientToken, 
                    setClientToken 
                }

    return <ClientContext.Provider value={value} >{children}</ClientContext.Provider>
}