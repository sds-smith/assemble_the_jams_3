import { useEffect, useContext } from 'react'

import NowPlayingCard from '../now-playing-card/now-playing-card.component'

import { UserContext } from '../../../contexts/user.context'
import { PlayerContext } from '../../../contexts/player.context'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = ({ onAdd }) => {

    const { currentUser, accessToken } = useContext(UserContext)
    const { setCurrentPlayer, setDeviceId, nowPlaying } = useContext(PlayerContext)

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
    },[currentUser])

    return (
        <WebPlayerContainer >        
            { nowPlaying.hasTrack &&
                <NowPlayingCard onAdd={onAdd} />
            }
        </WebPlayerContainer>
    )
}

export default WebPlayer