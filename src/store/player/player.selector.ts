import { createSelector } from "reselect"
import { RootState } from "../store"

const selectPlayerReducer = (state: RootState) => state.player

export const selectSpotifyPlayerLoading = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.spotifyPlayerLoading
)
export const selectCurrentPlayer = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.currentPlayer
) 
export const selectBrowserBlocked = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.browserBlocked
)
export const selectdeviceId = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.deviceId
)
export const selectNowPlaying = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.nowPlaying
)

// export const selectActive = (state: RootState) => state.player.active
export const selectActive = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.active
)

export const selectActivePlayer = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.activePlayer
)
export const selectNowPlayingInitialState = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.nowPlayingInitialState
)
export const selectPlaybackError = createSelector(
    [selectPlayerReducer],
    (playerSlice) => playerSlice.playbackError
)