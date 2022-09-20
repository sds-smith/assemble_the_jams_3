import { createSelector } from "reselect"
import { RootState } from "../store"

const selectTrackReducer = (state: RootState) => state.track

export const selectSearchResults = createSelector(
    [selectTrackReducer],
    (trackSlice) => trackSlice.searchResults
 )
export const selectPlaylistTracks = createSelector(
    [selectTrackReducer],
    (trackSlice) => trackSlice.playlistTracks
)
export const selectPlaylistName = createSelector(
    [selectTrackReducer],
    (trackSlice) => trackSlice.playlistName
)
export const selectSearchLoading = createSelector(
    [selectTrackReducer],
    (trackSlice) => trackSlice.searchLoading
) 