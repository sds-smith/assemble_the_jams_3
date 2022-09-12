import { useContext } from 'react'

import NowPlayingCard from './now-playing-card/now-playing-card.component'

import { PlayerContext } from '../../../contexts/player.context'
import { ResponsiveContext } from '../../../contexts/responsive.context'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = () => {

    const { nowPlaying } = useContext(PlayerContext)
    const {isMobile} = useContext(ResponsiveContext)

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