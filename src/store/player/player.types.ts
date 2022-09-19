
import { TrackType } from "../track/track.types";

export enum PLAYER_ACTION_TYPES {
    SET_SPOTIFY_PLAYER_LOADING = 'SET_SPOTIFY_PLAYER_LOADING',
    SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER',
    SET_BROWSER_BLOCKED = 'SET_BROWSER_BLOCKED',
    SET_DEVICE_ID = 'SET_DEVICE_ID',
    SET_NOW_PLAYING = 'SET_NOW_PLAYING',
    SET_ACTIVE = 'SET_ACTIVE',
    SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER',
    SET_ACTIVE_SPOTIFY = 'SET_ACTIVE_SPOTIFY',
    SET_ACTIVE_AUDIO_ELEMENT = 'SET_ACTIVE_AUDIO_ELEMENT'
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