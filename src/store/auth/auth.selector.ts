import { RootState } from "../store"

export const selectAuthSession = (state: RootState) => state.auth.authSession
export const selectAccessToken = (state: RootState) => state.auth.accessToken