
import { TRACK_ACTION_TYPES } from "./track.types"

export const setSearchResults = (session) => {
    return {
        type: TRACK_ACTION_TYPES.SET_SEARCH_RESULTS,
        payload: session
    }
}

export const setPlaylistTracks = (session) => {
    return {
        type: TRACK_ACTION_TYPES.SET_PLAYLIST_TRACKS,
        payload: session
    }
}

export const setRecommendations = (session) => {
    return {
        type: TRACK_ACTION_TYPES.SET_RECOMMENDATIONS,
        payload: session
    }
}

export const setPlaylistName = (session) => {
    return {
        type: TRACK_ACTION_TYPES.SET_PLAYLIST_NAME,
        payload: session
    }
}

export const setSearchLoading = (session) => {
    return {
        type: TRACK_ACTION_TYPES.SET_SEARCH_LOADING,
        payload: session
    }
}