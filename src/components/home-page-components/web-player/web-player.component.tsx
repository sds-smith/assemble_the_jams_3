import { useContext } from 'react'
import { useSelector } from 'react-redux'

import NowPlayingCard from './now-playing-card/now-playing-card.component'

import { selectNowPlaying } from '../../../store/player/player.selector'
import { ResponsiveContext } from '../../../contexts/responsive.context'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = () => {

    const nowPlaying = useSelector(selectNowPlaying)
    const { isMobile } = useContext(ResponsiveContext) 

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