import { RootState } from "../store"

export const selectSearchResults = (state: RootState) => state.track.searchResults

export const selectPlaylistTracks = (state: RootState) => state.track.playlistTracks 

export const selectPlaylistName = (state: RootState) => state.track.playlistName

export const selectSearchLoading = (state: RootState) => state.track.searchLoading 
