import { RootState } from "../store"

export const selectClientToken = (state: RootState) => state.auth.clientToken
export const selectAuthSession = (state: RootState) => state.auth.authSession
export const selectAccessToken = (state: RootState) => state.auth.accessToken