import { useContext } from 'react'

import NowPlayingCard from './now-playing-card/now-playing-card.component'

import { PlayerContext } from '../../../contexts/player.context'
import { useMediaQuery } from '../../../utils/custom-hooks/use-media-query'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = () => {

    const { nowPlaying } = useContext(PlayerContext)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    return (
        <WebPlayerContainer isMobile={isMobile} >       
            { 
                nowPlaying.hasTrack && 
                    <NowPlayingCard />
            }    
        </WebPlayerContainer>
    )
}

export default WebPlayer