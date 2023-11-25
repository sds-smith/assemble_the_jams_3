import { createContext, useState, FC } from "react";
import { INITIAL_STATE, nowPlayingInitialState } from "../utils/types/player.types";
import { PlayerContextProps, ProviderProps } from "../utils/types/context.utils";

export const PlayerContext = createContext<PlayerContextProps>({
    ...INITIAL_STATE,
    setNowPlaying: () => {},
    setActive: () => {},

});

export const PlayerProvider: FC<ProviderProps> = ({children}) => {
    const [nowPlaying, setNowPlaying] = useState(nowPlayingInitialState);
    const [active, setActive] = useState(false);

    const value = {
        nowPlaying, setNowPlaying,
        active, setActive
    };

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};