import { createSelector } from "reselect"
import { RootState } from "../store"

const selectAuthReducer = (state: RootState) => state.auth

export const selectClientToken = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.clientToken
)
export const selectAuthSession = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.authSession
)
export const selectAccessToken = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.accessToken
)
export const selectRefreshToken = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.refreshToken
    )
export const selectExpiresAt = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.expiresAt
)