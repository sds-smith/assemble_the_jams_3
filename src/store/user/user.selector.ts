import { createSelector } from "reselect"
import { RootState } from "../store"

const selectUserReducer = (state: RootState) => state.user

export const selectUserLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.userLoading
)
export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.currentUser
)
export const selectCurrentUserExists = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.display_name.length > 0
)
