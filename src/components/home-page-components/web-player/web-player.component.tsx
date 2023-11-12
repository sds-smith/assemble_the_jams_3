import { useContext } from 'react';

import NowPlayingCard from './now-playing-card/now-playing-card.component';

import { ResponsiveContext } from '../../../contexts/responsive.context';
import { PlayerContext } from '../../../contexts/player.context';

import { WebPlayerContainer } from "./web-player.styles";

const WebPlayer = () => {
    const { isMobile } = useContext(ResponsiveContext) 
    const { nowPlaying } = useContext(PlayerContext);

    return (
        <WebPlayerContainer isMobile={isMobile} >       
            { nowPlaying?.hasTrack && <NowPlayingCard /> }    
        </WebPlayerContainer>
    );
};

export default WebPlayer;