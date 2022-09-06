
import { TRACK_ACTION_TYPES, Track } from "./track.types"
import { ActionWithPayload } from "../../utils/reducer.utils" 

export const setSearchResults = (tracks: Track[]): ActionWithPayload<TRACK_ACTION_TYPES.SET_SEARCH_RESULTS, Track[]> => {
    return {
        type: TRACK_ACTION_TYPES.SET_SEARCH_RESULTS,
        payload: tracks
    }
}

export const setPlaylistTracks = (tracks : Track[]): ActionWithPayload<TRACK_ACTION_TYPES.SET_PLAYLIST_TRACKS, Track[]> => {
    return {
        type: TRACK_ACTION_TYPES.SET_PLAYLIST_TRACKS,
        payload: tracks
    }
}

export const setPlaylistName = (name: string): ActionWithPayload<TRACK_ACTION_TYPES.SET_PLAYLIST_NAME, string> => {
    return {
        type: TRACK_ACTION_TYPES.SET_PLAYLIST_NAME,
        payload: name
    }
}

export const setSearchLoading = (loading: boolean): ActionWithPayload<TRACK_ACTION_TYPES.SET_SEARCH_LOADING, boolean> => {
    return {
        type: TRACK_ACTION_TYPES.SET_SEARCH_LOADING,
        payload: loading
    }
}