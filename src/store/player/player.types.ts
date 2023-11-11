
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
    SET_ACTIVE_AUDIO_ELEMENT = 'SET_ACTIVE_AUDIO_ELEMENT',
    SET_PLAYBACK_ERROR = 'SET_PLAYBACK_ERROR'   
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

export const nowPlayingInitialState = {
    hasTrack: false,
    track : {
      album: '',
      artist: '',
      cover: '',
      id: '',
      name: '',
      preview: '',
      uri: '',
    },
    isLike : null
}  

export type PlayerState = {
    readonly spotifyPlayerLoading: boolean;
    readonly currentPlayer: Spotify.Player | null;
    readonly browserBlocked: boolean;
    readonly deviceId: string;
    readonly nowPlaying: NowPlaying;
    readonly active: boolean;
    readonly activePlayer: ActivePlayer;
    readonly nowPlayingInitialState: NowPlaying;
    readonly playbackError: boolean;
}

  export const defaultActivePlayer = {
    spotify: false,
    audioElement: false
  }

export const INITIAL_STATE: PlayerState = {
    spotifyPlayerLoading: false,
    currentPlayer: null,
    browserBlocked: false,
    deviceId: '',
    nowPlaying: nowPlayingInitialState,
    active: false,
    activePlayer: defaultActivePlayer,
    nowPlayingInitialState,
    playbackError : false
}