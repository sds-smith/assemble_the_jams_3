import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
    const [deviceId, setDeviceId] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState(undefined);
    const [nowPlaying, setNowPlaying] = useState(null);
    const [active, setActive] = useState(false);
    const [spotifyPlayerLoading, setSpotifyPlayerLoading] = useState(false);
    const [browserBlocked, setBrowserBlocked] = useState(false);

    const value = {
        deviceId, setDeviceId,
        currentPlayer, setCurrentPlayer,
        nowPlaying, setNowPlaying,
        active, setActive,
        spotifyPlayerLoading, setSpotifyPlayerLoading,
        browserBlocked, setBrowserBlocked
    };

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};