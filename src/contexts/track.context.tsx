import { createContext, useState, FC } from "react";
import { ProviderProps, TrackContextProps } from "../utils/context.utils";
import { INITIAL_STATE } from "../store/track/track.types";

export const TrackContext = createContext<TrackContextProps>({
    ...INITIAL_STATE,
    setSearchResults: () => {},
    setPlaylistTracks: () => {},
    setPlaylistName: () => {},
    setSearchLoading: () => {},
});

export const TrackProvider: FC<ProviderProps> = ({children}) => {
    const [searchResults, setSearchResults] = useState(INITIAL_STATE.searchResults);
    const [playlistTracks, setPlaylistTracks] = useState(INITIAL_STATE.playlistTracks);
    const [playlistName, setPlaylistName] = useState(INITIAL_STATE.playlistName);
    const [searchLoading, setSearchLoading] = useState(INITIAL_STATE.searchLoading);


    const value = {
        searchResults, setSearchResults,
        playlistTracks, setPlaylistTracks,
        playlistName, setPlaylistName,
        searchLoading, setSearchLoading
    };

    return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
}