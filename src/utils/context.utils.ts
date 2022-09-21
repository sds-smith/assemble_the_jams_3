import { ReactNode } from "react";

export type ActiveTabType = {
    'playlist' : boolean;
    'search_results' : boolean;
}

export type ActiveViewType = {
    'input' : boolean;
    'results' : boolean;
}

export type ResponsiveContextProps = {
    isMobile: boolean;
    activeTab: ActiveTabType;
    activeView: ActiveViewType;
    setDesktop(): void;
    setMobileHome(): void;
    setMobilePlaylist(): void;
    setMobileSearchResults(): void;
}

export type ProviderProps = {
    children?: ReactNode
}