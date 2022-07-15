import { createContext, useState } from "react";

export const PlayerContext = createContext({
    currentPlayer : null,
    setCurrentPlayer : () => null,
    deviceID : null,
    setDeviceId : () => null,
    nowPlaying : null,
    setNowPlaying : () => null,
    active : null,
    setActive : () => null
})

export const PlayerProvider = ({children}) => {
    const [currentPlayer, setCurrentPlayer] = useState(undefined)
    const [deviceID, setDeviceId] = useState('')
    const [nowPlaying, setNowPlaying] = useState({
      hasTrack: false,
      track : {},
      isLike : null
    })
    const [active, setActive] = useState(false)
    
    const value = { currentPlayer, 
                    setCurrentPlayer,
                    deviceID,
                    setDeviceId,
                    nowPlaying,
                    setNowPlaying,
                    active,
                    setActive 
                }

    return <PlayerContext.Provider value={value} >{children}</PlayerContext.Provider>
}