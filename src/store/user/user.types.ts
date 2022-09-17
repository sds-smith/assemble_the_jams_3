

export enum USER_ACTION_TYPES {
    SET_USER_LOADING = 'SET_USER_LOADING',
    SET_CURRENT_USER = 'SET_CURRENT_USER',
}

export type CurrentUserType = {
    display_name: string;
    image_url: string;
    id: string;
}

export const defaultCurrentUser = {
    display_name: '',
    image_url: '',
    id: ''
}