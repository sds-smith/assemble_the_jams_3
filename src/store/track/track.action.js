
import { TRACK_ACTION_TYPES } from "./track.types"

export const setSearchResults = (tracks) => {
    return {
        type: TRACK_ACTION_TYPES.SET_SEARCH_RESULTS,
        payload: tracks
    }
}

export const setPlaylistTracks = (tracks) => {
    return {
        type: TRACK_ACTION_TYPES.SET_PLAYLIST_TRACKS,
        payload: tracks
    }
}

export const setPlaylistName = (name) => {
    return {
        type: TRACK_ACTION_TYPES.SET_PLAYLIST_NAME,
        payload: name
    }
}

export const setSearchLoading = (loading) => {
    return {
        type: TRACK_ACTION_TYPES.SET_SEARCH_LOADING,
        payload: loading
    }
}