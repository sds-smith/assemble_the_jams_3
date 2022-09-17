import { AnyAction } from "redux"
import { USER_ACTION_TYPES, CurrentUserType, defaultCurrentUser } from "./user.types"

export type UserState = {
    readonly userLoading : boolean;
    readonly currentUser : CurrentUserType;

}

const INITIAL_STATE: UserState = {
    userLoading : false,
    currentUser : defaultCurrentUser,
}

export const userReducer = (
    state = INITIAL_STATE, 
    action: AnyAction
) => {
    const { type, payload } = action

    switch(type) {
        case USER_ACTION_TYPES.SET_USER_LOADING :
            return {
                ...state,
                userLoading : payload
            }
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser : payload
            }
        default : 
            return state
    }
}