import { ReactNode } from "react";
import { TrackType } from "../store/track/track.types";

export type ClientContextProps = {
    clientToken: string;
    setClientToken(clientToken: string): void
}

export type NowPlaying = {
    hasTrack: boolean;
    isLike: boolean | null;
    track: TrackType;
}

export type ActivePlayer = {
    spotify: boolean;
    audioElement: boolean;
}

export type PlayerContextProps = {
    currentPlayer : (Spotify.Player) | null;
    setCurrentPlayer(currentPlayer: (Spotify.Player) | null): void;
    browserBlocked : boolean | null;
    setBrowserBlocked(browserBlocked : boolean) : void;
    deviceID : string;
    setDeviceId(deviceID: string): void;
    nowPlaying : NowPlaying;
    setNowPlaying(nowPlaying: NowPlaying): void;
    active : boolean;
    setActive(active: boolean): void;
    activePlayer : ActivePlayer;
    nowPlayingInitialState: NowPlaying;
}

export type CurrentUserType = {
    display_name: string;
    image_url: string;
    id: string;
}

export type UserContextProps = {
    userLoading : boolean;
    setUserLoading(userLoading : boolean): void;
    currentUser : CurrentUserType;
    setCurrentUser(currentUser : CurrentUserType): void;
    defaultCurrentUser: CurrentUserType;
    currentUserExists(): boolean;
}


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