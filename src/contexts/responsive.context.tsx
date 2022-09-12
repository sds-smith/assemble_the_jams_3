import { createContext, useState, FC } from "react";
import { ResponsiveContextProps, ProviderProps } from "../utils/context.utils";

const desktopActiveTab = {
    'playlist' : true,
    'search_results' : true
}

const desktopActiveView = {
    'input' : true,
    'results' : true
}

export const ResponsiveContext = createContext<ResponsiveContextProps>({
    activeTab: desktopActiveTab,
    setActiveTab: () => desktopActiveTab,
    activeView: desktopActiveView,
    setActiveView: () => desktopActiveView
})

export const ResponsiveProvider: FC<ProviderProps> = ({children}) => {
    const [activeTab, setActiveTab] = useState(desktopActiveTab)
    const [activeView, setActiveView] = useState(desktopActiveView)

    const value = { 
            activeTab,
            setActiveTab,
            activeView,
            setActiveView
                }

    return <ResponsiveContext.Provider value={value} >{children}</ResponsiveContext.Provider>
}