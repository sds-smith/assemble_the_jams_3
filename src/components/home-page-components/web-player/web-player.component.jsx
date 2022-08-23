import { useContext } from 'react'
import { useSelector } from 'react-redux'

import Player from '../player/player.component'
import NowPlayingCard from '../now-playing-card/now-playing-card.component'

import { selectAccessToken } from '../../../store/auth/auth.selector'
import { PlayerContext } from '../../../contexts/player.context'
import { useMediaQuery } from '../../../utils/customHooks'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = ({ onAdd }) => {

    const accessToken = useSelector(selectAccessToken)

    const { nowPlaying } = useContext(PlayerContext)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "https://sdk.scdn.co/spotify-player.js";
    //     script.async = true;
    
    //     document.body.appendChild(script);
    //     window.onSpotifyWebPlaybackSDKReady = () => {            
    //         const player = new window.Spotify.Player({
    //             name: 'Assemble the Jams',
    //             getOAuthToken: cb => { cb(accessToken); },
    //             volume: 0.5
    //         });            
    //         setCurrentPlayer(player)

    //         player.addListener('ready', ({ device_id }) => {
    //             console.log('Ready with Device ID', device_id);
    //             setDeviceId(device_id);
    //         });
        
    //         player.addListener('not_ready', ({ device_id }) => {
    //             console.log('Device ID has gone offline', device_id);
    //         });
        
    //         player.addListener('player_state_changed', ( state => {
    //             if (!state) {
    //                 return;
    //             }
    //         }));
    //         player.connect();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])

    return (
        <WebPlayerContainer isMobile={isMobile} >     
            { accessToken && <Player /> }   
            { nowPlaying.hasTrack && 
                <NowPlayingCard onAdd={onAdd} />
            }    
        </WebPlayerContainer>
    )
}

export default WebPlayer