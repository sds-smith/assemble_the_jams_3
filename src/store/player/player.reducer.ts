import { AnyAction } from "redux"
import { ActivePlayer, NowPlaying, PLAYER_ACTION_TYPES } from "./player.types"

export type PlayerState = {
    readonly spotifyPlayerLoading: boolean;
    readonly currentPlayer: Spotify.Player | null;
    readonly browserBlocked: boolean;
    readonly deviceId: string;
    readonly nowPlaying: NowPlaying;
    readonly active: boolean;
    readonly activePlayer: ActivePlayer;
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

  export const defaultActivePlayer = {
    spotify: false,
    audioElement: false
  }

const INITIAL_STATE: PlayerState = {
    spotifyPlayerLoading: false,
    currentPlayer: null,
    browserBlocked: false,
    deviceId: '',
    nowPlaying: nowPlayingInitialState,
    active: false,
    activePlayer: defaultActivePlayer
}

export const playerReducer = (
    state = INITIAL_STATE, 
    action: AnyAction
) => {
    const { type, payload } = action

    switch(type) {
        case PLAYER_ACTION_TYPES.SET_SPOTIFY_PLAYER_LOADING :
            return {
                ...state,
                spotifyPlayerLoading : payload
            }
        case PLAYER_ACTION_TYPES.SET_CURRENT_PLAYER :
            return {
                ...state,
                currentPlayer : payload
            }
        case PLAYER_ACTION_TYPES.SET_BROWSER_BLOCKED :
            return {
                ...state,
                browserBlocked : payload
            }
        case PLAYER_ACTION_TYPES.SET_DEVICE_ID :
            return {
                ...state,
                deviceId : payload
            }
        case PLAYER_ACTION_TYPES.SET_NOW_PLAYING :
            return {
                ...state,
                nowPlaying : payload
            }
        case PLAYER_ACTION_TYPES.SET_ACTIVE :
            return {
                ...state,
                active : payload
            }
        case PLAYER_ACTION_TYPES.SET_ACTIVE_PLAYER :
            return {
                ...state,
                activePlayer : payload
            }
        default : 
            return state
    }
}