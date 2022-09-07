import { ReactNode } from "react";
import { Track } from "../store/track/track.types";


export type ClientContextProps = {
    clientToken: string;
    setClientToken(clientToken: string): void
}

export type NowPlaying = {
    hasTrack: boolean;
    isLike: boolean | null;
    track: Track;
}

export type PlayerContextProps = {
    currentPlayer : (typeof Spotify.Player) | null;
    setCurrentPlayer(currentPlayer: (typeof Spotify.Player) | null): void;
    deviceID : string | null;
    setDeviceId(deviceID: string | null): void;
    nowPlaying : NowPlaying;
    setNowPlaying(nowPlaying: NowPlaying): void;
    active : boolean | null;
    setActive(active: boolean | null): void;
}

export type CurrentUserType = {
    display_name: string;
    imageUrl: string;
}

export type UserContextProps = {
    userLoading : boolean | null;
    setUserLoading(userLoading : boolean | null): void;
    currentUser : CurrentUserType | null;
    setCurrentUser(currentUser : CurrentUserType | null): void;
}

export type ProviderProps = {
    children?: ReactNode
}
