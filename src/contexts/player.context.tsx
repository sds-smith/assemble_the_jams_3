import { createContext, useState, FC } from "react";
import { PlayerContextProps, ProviderProps, NowPlaying } from "../utils/context.utils";

export const nowPlayingInitialState = {
    hasTrack: false,
    track : {
      album: null,
      artist: null,
      cover: null,
      id: null,
      name: null,
      preview: null,
      uri: null,
    },
    isLike : null
  }  

export const PlayerContext = createContext<PlayerContextProps>({
    currentPlayer : null,
    setCurrentPlayer : () => null,
    deviceID : '',
    setDeviceId : () => '',
    nowPlaying : nowPlayingInitialState,
    setNowPlaying : () => nowPlayingInitialState,
    active : false,
    setActive : () => false,
    nowPlayingInitialState
})

export const PlayerProvider: FC<ProviderProps> = ({children}) => {
    const [currentPlayer, setCurrentPlayer] = useState<(Spotify.Player) | null>(null)
    const [deviceID, setDeviceId] = useState<string>('')
    const [nowPlaying, setNowPlaying] = useState<NowPlaying>(nowPlayingInitialState)
    const [active, setActive] = useState<boolean>(false)
    
    const value = { currentPlayer, 
                    setCurrentPlayer,
                    deviceID,
                    setDeviceId,
                    nowPlaying,
                    setNowPlaying,
                    active,
                    setActive,
                    nowPlayingInitialState
                }

    return <PlayerContext.Provider value={value} >{children}</PlayerContext.Provider>
}