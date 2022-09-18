
import { PLAYER_ACTION_TYPES, NowPlaying, ActivePlayer } from "./player.types"
import { ActionWithPayload } from "../../utils/reducer.utils"

export const setSpotifyPlayerLoading = (loading: boolean):
ActionWithPayload<PLAYER_ACTION_TYPES.SET_SPOTIFY_PLAYER_LOADING, boolean> => 
{
    return {
        type: PLAYER_ACTION_TYPES.SET_SPOTIFY_PLAYER_LOADING,
        payload: loading
    }
}
export const setCurrentPlayer = (player: (Spotify.Player) | null):
ActionWithPayload<PLAYER_ACTION_TYPES.SET_CURRENT_PLAYER, (Spotify.Player) | null> => 
{
    return {
        type: PLAYER_ACTION_TYPES.SET_CURRENT_PLAYER,
        payload: player
    }
}
export const setBrowserBlocked = (blocked: boolean):
ActionWithPayload<PLAYER_ACTION_TYPES.SET_BROWSER_BLOCKED, boolean> => 
{
    return {
        type: PLAYER_ACTION_TYPES.SET_BROWSER_BLOCKED,
        payload: blocked
    }
}
export const setDeviceId = (id: string):
ActionWithPayload<PLAYER_ACTION_TYPES.SET_DEVICE_ID, string> => 
{
    return {
        type: PLAYER_ACTION_TYPES.SET_DEVICE_ID,
        payload: id
    }
}
export const setNowPlaying = (nowPlaying: NowPlaying):
ActionWithPayload<PLAYER_ACTION_TYPES.SET_NOW_PLAYING, NowPlaying> => 
{
    return {
        type: PLAYER_ACTION_TYPES.SET_NOW_PLAYING,
        payload: nowPlaying
    }
}
export const setActive = (active: boolean):
ActionWithPayload<PLAYER_ACTION_TYPES.SET_ACTIVE, boolean> => 
{
    return {
        type: PLAYER_ACTION_TYPES.SET_ACTIVE,
        payload: active
    }
}
export const setActivePlayer = (activePlayer: ActivePlayer):
ActionWithPayload<PLAYER_ACTION_TYPES.SET_ACTIVE_PLAYER, ActivePlayer> => 
{
    return {
        type: PLAYER_ACTION_TYPES.SET_ACTIVE_PLAYER,
        payload: activePlayer
    }
}

