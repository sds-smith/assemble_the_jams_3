import { useContext } from 'react'

import NowPlayingCard from './now-playing-card/now-playing-card.component'

import { ResponsiveContext } from '../../../contexts/responsive.context'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = () => {

    const { isMobile } = useContext(ResponsiveContext) 

    return (
        <WebPlayerContainer isMobile={isMobile} >       
            {/* { 
                nowPlaying.hasTrack && 
                    <NowPlayingCard />
            }     */}
        </WebPlayerContainer>
    )
}

export default WebPlayer