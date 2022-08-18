import { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'

import NowPlayingCard from '../now-playing-card/now-playing-card.component'

import { selectAccessToken } from '../../../store/auth/auth.selector'
import { UserContext } from '../../../contexts/user.context'
import { PlayerContext } from '../../../contexts/player.context'
import { useMediaQuery } from '../../../utils/customHooks'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = ({ onAdd }) => {

    const accessToken = useSelector(selectAccessToken)
    const { currentUser } = useContext(UserContext)

    const { setCurrentPlayer, setDeviceId, nowPlaying } = useContext(PlayerContext)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    useEffect(() => {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
        
            document.body.appendChild(script);
        
            window.onSpotifyWebPlaybackSDKReady = () => {            
                const player = new window.Spotify.Player({
                    name: 'Assemble the Jams',
                    getOAuthToken: cb => { cb(accessToken); },
                    volume: 0.5
                });            
                setCurrentPlayer(player)

                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id, player);
                    setDeviceId(device_id);
                });
            
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
            
                player.addListener('player_state_changed', ( state => {
                    console.log('player state changed', state)
                    if (!state) {
                        return;
                    }
                }));
                player.connect();
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accessToken, currentUser])

    return (
        <WebPlayerContainer isMobile={isMobile} >        
            { nowPlaying.hasTrack && 
                <NowPlayingCard onAdd={onAdd} />
            }    
        </WebPlayerContainer>
    )
}

export default WebPlayer