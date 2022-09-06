

export enum TRACK_ACTION_TYPES {
    SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
    SET_PLAYLIST_TRACKS = 'SET_PLAYLIST_TRACKS',
    SET_PLAYLIST_NAME = 'SET_PLAYLIST_NAME',
    SET_SEARCH_LOADING = 'SET_SEARCH_LOADING'
}

export type Track = {
    id : string;
    name : string;
    artist : string;
    album : string;
    cover : string;
    uri : string;
    preview : string;
}