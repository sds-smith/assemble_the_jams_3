import { useContext } from 'react'
import { useSelector } from 'react-redux'

import Player from '../player/player.component'
import NowPlayingCard from '../now-playing-card/now-playing-card.component'

import { selectAccessToken } from '../../../store/auth/auth.selector'
import { PlayerContext } from '../../../contexts/player.context'
import { useMediaQuery } from '../../../utils/customHooks'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = () => {

    const accessToken = useSelector(selectAccessToken)

    const { nowPlaying } = useContext(PlayerContext)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    return (
        <WebPlayerContainer isMobile={isMobile} >     
            { accessToken && <Player /> }   
            { nowPlaying.hasTrack && 
                <NowPlayingCard />
            }    
        </WebPlayerContainer>
    )
}

export default WebPlayer