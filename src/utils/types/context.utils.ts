import { ReactNode } from "react";
import { TrackType, TrackState } from "./track.types";
import { NowPlaying } from "./player.types";


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
};

export type TrackContextProps = {
    searchResultsArray: TrackType[];
    recommendationsArray: TrackType[];
    playlistName: string;
    searchLoading: boolean;
    setSearchResultsArray(searchResultsArray: TrackType[]): void;
    setRecommendationsArray(recommendationsArray: TrackType[]): void;
    setPlaylistName(laylistName: string): void;
    setSearchLoading(searchLoading: boolean): void;
}

export type PlayerContextProps = {
    nowPlaying: NowPlaying;
    active: boolean;
    setNowPlaying(nowPlaying: NowPlaying): void;
    setActive(active: boolean): void;
}

export type ProviderProps = {
    children?: ReactNode
}