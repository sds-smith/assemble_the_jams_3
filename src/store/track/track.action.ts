
import { TRACK_ACTION_TYPES, TrackType } from "./track.types"
import { ActionWithPayload } from "../../utils/reducer.utils"

export const setSearchResults = (tracks: TrackType[]):
    ActionWithPayload<TRACK_ACTION_TYPES.SET_SEARCH_RESULTS, TrackType[]> => 
{
    return {
        type: TRACK_ACTION_TYPES.SET_SEARCH_RESULTS,
        payload: tracks
    }
}

export const setPlaylistTracks = (tracks: TrackType[]):
    ActionWithPayload<TRACK_ACTION_TYPES.SET_PLAYLIST_TRACKS, TrackType[]> => 
{
    return {
        type: TRACK_ACTION_TYPES.SET_PLAYLIST_TRACKS,
        payload: tracks
    }
}

export const setPlaylistName = (name: string):
    ActionWithPayload<TRACK_ACTION_TYPES.SET_PLAYLIST_NAME, string> => 
{
    return {
        type: TRACK_ACTION_TYPES.SET_PLAYLIST_NAME,
        payload: name
    }
}

export const setSearchLoading = (loading: boolean):
    ActionWithPayload<TRACK_ACTION_TYPES.SET_SEARCH_LOADING, boolean> => 
{
    return {
        type: TRACK_ACTION_TYPES.SET_SEARCH_LOADING,
        payload: loading
    }
}