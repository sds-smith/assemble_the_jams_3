import { createContext, useState } from "react";

export const ClientContext = createContext({
    clientToken : null,
    setClientToken : () => null,
})

export const ClientProvider = ({children}) => {
    const [clientToken, setClientToken] = useState(null)

    const value = { 
                    clientToken, 
                    setClientToken 
                }

    return <ClientContext.Provider value={value} >{children}</ClientContext.Provider>
}