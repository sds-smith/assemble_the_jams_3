import { RootState } from "../store"

export const selectUserLoading = (state: RootState) => state.user.userLoading
export const selectClientToken = (state: RootState) => state.user.currentUser
