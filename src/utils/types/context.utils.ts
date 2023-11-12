import { ReactNode } from "react";
import { TrackType, TrackState } from "./track.types";

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
    searchResults: TrackType[];
    playlistTracks: TrackType[];
    playlistName: string;
    searchLoading: boolean;
    setSearchResults(searchResults: TrackType[]): void;
    setPlaylistTracks(playlistTracks: TrackType[]): void;
    setPlaylistName(laylistName: string): void;
    setSearchLoading(searchLoading: boolean): void;
}

export type ProviderProps = {
    children?: ReactNode
}