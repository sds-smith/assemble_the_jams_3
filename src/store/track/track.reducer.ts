import { AnyAction } from "redux"
import { TRACK_ACTION_TYPES } from "./track.types"

const INITIAL_STATE = {
    searchResults : [], 
    playlistTracks : [], 
    playlistName : "Name Your New Playlist", 
    searchLoading : false, 
}

export const trackReducer = (
    state=INITIAL_STATE, 
    action: AnyAction
) => {
    const { type, payload } = action

    switch(type) {
        case TRACK_ACTION_TYPES.SET_SEARCH_RESULTS :
            return {
                ...state,
                searchResults : payload
            }
        case TRACK_ACTION_TYPES.SET_PLAYLIST_TRACKS :
            return {
                ...state,
                playlistTracks : payload
            }
        case TRACK_ACTION_TYPES.SET_PLAYLIST_NAME :
            return {
                ...state,
                playlistName : payload
            }
        case TRACK_ACTION_TYPES.SET_SEARCH_LOADING :
            return {
                ...state,
                searchLoading : payload
            }
        default : 
            return state
    }
}