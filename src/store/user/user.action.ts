
import { USER_ACTION_TYPES, CurrentUserType } from "./user.types"
import { ActionWithPayload } from "../../utils/reducer.utils"

export const setUserLoading = (loading: boolean):
    ActionWithPayload<USER_ACTION_TYPES.SET_USER_LOADING, boolean> => 
{
    return {
        type: USER_ACTION_TYPES.SET_USER_LOADING,
        payload: loading
    }
}
export const setCurrentUser = (user: CurrentUserType): 
    ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, CurrentUserType> => 
{
    return {
        type: USER_ACTION_TYPES.SET_CURRENT_USER,
        payload: user
    }
}
