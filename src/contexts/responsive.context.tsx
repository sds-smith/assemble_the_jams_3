import { createContext, useState, FC } from "react";
import { ResponsiveContextProps, ProviderProps } from "../utils/context.utils";
import { useMediaQuery } from "../utils/custom-hooks/use-media-query";


const desktopActiveTab = {
    'playlist' : true,
    'search_results' : true
}

const mobilePlaylistActiveTab = {
    'playlist' : true,
    'search_results' : false
}

const mobileSearchResultsActiveTab = {
    'playlist' : false,
    'search_results' : true
}

const desktopActiveView = {
    'input' : true,
    'results' : true
}

const mobileHomeView = {
    'input' : true,
    'results' : false
}

const mobileResultsView = {
    'input' : false,
    'results' : true
}

export const ResponsiveContext = createContext<ResponsiveContextProps>({
    isMobile: false,
    activeTab: desktopActiveTab,
    setActiveTab: () => desktopActiveTab,
    activeView: desktopActiveView,
    setActiveView: () => desktopActiveView,
    setDesktop: () => {},
    setMobileHome: () => {},
    setMobilePlaylist: () => {},
    setMobileSearchResults: () => {}
})

export const ResponsiveProvider: FC<ProviderProps> = ({children}) => {
    const [activeTab, setActiveTab] = useState(desktopActiveTab)
    const [activeView, setActiveView] = useState(desktopActiveView)

    const isMobile = useMediaQuery('(max-width: 1020px)')

    const setDesktop = () => {
        setActiveTab(desktopActiveTab)
        setActiveView(desktopActiveView)
    }

    const setMobileHome = () => {
        setActiveTab(mobilePlaylistActiveTab)
        setActiveView(mobileHomeView)
    }

    const setMobilePlaylist = () => {
        setActiveTab(mobilePlaylistActiveTab)
        setActiveView(mobileResultsView)
    }

    const setMobileSearchResults = () => {
        setActiveTab(mobileSearchResultsActiveTab)
        setActiveView(mobileResultsView)
    }

    const value = { 
        setActiveTab,
        setActiveView,

            isMobile,
            activeTab,
            activeView,
            setDesktop,
            setMobileHome,
            setMobilePlaylist,
            setMobileSearchResults
                }

    return <ResponsiveContext.Provider value={value} >{children}</ResponsiveContext.Provider>
}