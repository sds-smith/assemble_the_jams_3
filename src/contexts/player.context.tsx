import { createContext, useState, FC } from "react";
import { PlayerContextProps, ProviderProps, NowPlaying, ActivePlayer } from "../utils/context.utils";

export const nowPlayingInitialState = {
    hasTrack: false,
    track : {
      album: '',
      artist: '',
      cover: '',
      id: '',
      name: '',
      preview: '',
      uri: '',
    },
    isLike : null
  }  

  export const defaultActivePlayer = {
    spotify: false,
    audioElement: false
  }

export const PlayerContext = createContext<PlayerContextProps>({
    spotifyPlayerLoading : false,
    setSpotifyPlayerLoading : () => false,
    currentPlayer : null,
    setCurrentPlayer : () => null,
    browserBlocked : null,
    setBrowserBlocked : () => null,
    deviceId : '',
    setdeviceId : () => '',
    nowPlaying : nowPlayingInitialState,
    setNowPlaying : () => nowPlayingInitialState,
    active : false,
    setActive : () => false,
    activePlayer: defaultActivePlayer,
    setActiveSpotify: () => {},
    setActiveAudioElement: () => {},
    nowPlayingInitialState
})

export const PlayerProvider: FC<ProviderProps> = ({children}) => {
    const [spotifyPlayerLoading, setSpotifyPlayerLoading] = useState<boolean>(false)
    const [currentPlayer, setCurrentPlayer] = useState<(Spotify.Player) | null>(null)
    const [browserBlocked, setBrowserBlocked] = useState<boolean>(false)
    const [deviceId, setdeviceId] = useState<string>('')
    const [nowPlaying, setNowPlaying] = useState<NowPlaying>(nowPlayingInitialState)
    const [active, setActive] = useState<boolean>(false)
    const [activePlayer, setActivePlayer] = useState<ActivePlayer>(defaultActivePlayer)

    const setActiveSpotify = () => {
      setActivePlayer({
        spotify: true,
        audioElement: false
      })
    }
    const setActiveAudioElement = () => {
      setActivePlayer({
        spotify: false,
        audioElement: true
      })
    }
    
    const value = { 
                    spotifyPlayerLoading,
                    setSpotifyPlayerLoading,
                    currentPlayer, 
                    setCurrentPlayer,
                    browserBlocked,
                    setBrowserBlocked,
                    deviceId,
                    setdeviceId,
                    nowPlaying,
                    setNowPlaying,
                    active,
                    setActive,
                    activePlayer,
                    setActiveSpotify,
                    setActiveAudioElement,
                    nowPlayingInitialState
                }

    return <PlayerContext.Provider value={value} >{children}</PlayerContext.Provider>
}