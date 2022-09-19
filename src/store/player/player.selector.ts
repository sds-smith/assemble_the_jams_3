import { RootState } from "../store"

export const selectSpotifyPlayerLoading = (state: RootState) => state.player.spotifyPlayerLoading
export const selectCurrentPlayer = (state: RootState) => state.player.currentPlayer
export const selectBrowserBlocked = (state: RootState) => state.player.browserBlocked
export const selectdeviceId = (state: RootState) => state.player.deviceId
export const selectNowPlaying = (state: RootState) => state.player.nowPlaying
export const selectActive = (state: RootState) => state.player.active
export const selectActivePlayer = (state: RootState) => state.player.activePlayer
export const selectNowPlayingInitialState = (state: RootState) => state.player.nowPlayingInitialState
