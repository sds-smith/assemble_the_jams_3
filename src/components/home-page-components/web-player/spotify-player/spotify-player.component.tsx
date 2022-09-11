import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import Activate from "../../activate/activate.component";

import { selectAccessToken } from "../../../../store/auth/auth.selector";

import { PlayerContext } from '../../../../contexts/player.context'

const SpotifyPlayer = () => {
    const accessToken = useSelector(selectAccessToken)
    const { currentPlayerActivated, setCurrentPlayer, setDeviceId, setActive } = useContext(PlayerContext)

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {            
            const player = new window.Spotify.Player({
                name: 'Assemble the Jams',
                getOAuthToken: (callback: (t: string) => void) => { callback(accessToken); },
                volume: 0.5
            });            
            setCurrentPlayer(player)

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id);
            });
        
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
        
            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }

                player.getCurrentState().then( (state: Spotify.PlaybackState | null) => { 
                    if (state) {
                        if ((state.paused) && (state.position >= 30000) && (state.position < 30100)) {
                            player.resume()
                        } else if (state.paused) {
                            setActive(false)
                        } else {
                            setActive(true) 
                        }
                    } else {
                        setActive(false)
                    }
                });
            }));
            player.connect();
        };
    },[accessToken, currentPlayerActivated, setActive, setCurrentPlayer, setDeviceId])

    return (
        <div data-allow='encrypted-media autoplay'>
            { !currentPlayerActivated && <Activate/> }
        </div>
    )
}

export default SpotifyPlayer