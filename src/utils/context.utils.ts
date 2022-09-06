import { ReactNode } from "react";


export type ClientContextProps = {
    clientToken: string;
    setClientToken(clientToken: string): void
}

export type TrackType = {
    album: string | null;
    artist: string | null;
    cover: string | null;
    id: string | null;
    name: string | null;
    preview: string | null;
    uri: string | null;
}

export type NowPlaying = {
    hasTrack: boolean;
    isLike: boolean | null;
    track: TrackType;
}

export type PlayerContextProps = {
    currentPlayer : (typeof Spotify.Player) | null;
    setCurrentPlayer(currentPlayer: (typeof Spotify.Player) | null): void;
    deviceID : string | null;
    setDeviceId(deviceID: string | null): void;
    nowPlaying : NowPlaying | null;
    setNowPlaying(nowPlaying: NowPlaying | null): void;
    active : boolean | null;
    setActive(active: boolean | null): void;
}

export type CurrentUserType = {
    
}

export type UserContextProps = {
    userLoading : boolean | null;
    setUserLoading : () => null
    currentUser : null
    setCurrentUser : () => null
}

export type ProviderProps = {
    children?: ReactNode
}
