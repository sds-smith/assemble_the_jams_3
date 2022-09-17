import { RootState } from "../store"

export const selectUserLoading = (state: RootState) => state.user.userLoading
export const selectCurrentUser = (state: RootState) => state.user.currentUser

export const selectCurrentUserExists = (state: RootState) => state.user.currentUser.display_name.length > 0
