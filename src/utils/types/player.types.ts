
import { TrackType } from "./track.types";

export enum PLAYER_ACTION_TYPES {
    SET_SPOTIFY_PLAYER_LOADING = 'SET_SPOTIFY_PLAYER_LOADING',
    SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER',
    SET_BROWSER_BLOCKED = 'SET_BROWSER_BLOCKED',
    SET_DEVICE_ID = 'SET_DEVICE_ID',
    SET_NOW_PLAYING = 'SET_NOW_PLAYING',
    SET_ACTIVE = 'SET_ACTIVE',
    SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER',
    SET_ACTIVE_SPOTIFY = 'SET_ACTIVE_SPOTIFY',
    SET_ACTIVE_AUDIO_ELEMENT = 'SET_ACTIVE_AUDIO_ELEMENT',
    SET_PLAYBACK_ERROR = 'SET_PLAYBACK_ERROR'   
}

export type NowPlaying = {
    hasTrack: () => boolean;
    isLike: boolean;
    track: TrackType;
}

export type ActivePlayer = {
    spotify: boolean;
    audioElement: boolean;
}

export const nowPlayingInitialState: NowPlaying = {
    track : {
      album: '',
      artist: '',
      cover: '',
      id: '',
      name: '',
      preview: '',
      uri: '',
    },
    isLike : false,
    hasTrack() { return Boolean(this.track.id) },
}  

export type PlayerState = {
    readonly nowPlaying: NowPlaying;
    readonly active: boolean;
}

  export const defaultActivePlayer = {
    spotify: false,
    audioElement: false
  }

export const INITIAL_STATE: PlayerState = {
    nowPlaying: nowPlayingInitialState,
    active: false,
}