import { createContext, useState, FC } from "react";
import { ProviderProps, TrackContextProps } from "../utils/types/context.utils";
import { INITIAL_STATE } from "../utils/types/track.types";

export const TrackContext = createContext<TrackContextProps>({
    ...INITIAL_STATE,
    setSearchResultsArray: () => {},
    setRecommendationsArray: () => {},
    setPlaylistName: () => {},
    setSearchLoading: () => {},
});

export const TrackProvider: FC<ProviderProps> = ({children}) => {
    const [searchResultsArray, setSearchResultsArray] = useState(INITIAL_STATE.searchResultsArray);
    const [recommendationsArray, setRecommendationsArray] = useState(INITIAL_STATE.recommendationsArray);
    const [playlistName, setPlaylistName] = useState(INITIAL_STATE.playlistName);
    const [searchLoading, setSearchLoading] = useState(INITIAL_STATE.searchLoading);

    const value = {
        searchResultsArray, setSearchResultsArray,
        recommendationsArray, setRecommendationsArray,
        playlistName, setPlaylistName,
        searchLoading, setSearchLoading
    };

    return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>;
};