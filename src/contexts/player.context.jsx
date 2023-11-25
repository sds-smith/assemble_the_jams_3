import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
    const [nowPlaying, setNowPlaying] = useState(null);
    const [active, setActive] = useState(false);

    const value = {
        nowPlaying, setNowPlaying,
        active, setActive
    };

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};