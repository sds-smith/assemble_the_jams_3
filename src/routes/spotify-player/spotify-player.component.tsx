import { useEffect, useContext, FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import Home from "../home/home.component";
import Activate from "../../components/home-page-components/activate/activate.component";

import { AuthContext } from "../../contexts/auth.context";

import { selectAccessToken } from "../../store/auth/auth.selector";
import { selectActive, selectBrowserBlocked } from "../../store/player/player.selector";
import { setSpotifyPlayerLoading, setActiveSpotify, setCurrentPlayer, setdeviceId, setActive, setBrowserBlocked } from '../../store/player/player.action'

const SpotifyPlayer: FC = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const browserBlocked = useSelector(selectBrowserBlocked)
    const active = useSelector(selectActive)

    const {currentUserExists} = useContext(AuthContext)

    useEffect(() => {
        if (currentUserExists) {
            dispatch(setSpotifyPlayerLoading(true))
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
                dispatch(setCurrentPlayer(player))
    
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                    dispatch(setSpotifyPlayerLoading(false))
                    dispatch(setActiveSpotify())
                    dispatch(setdeviceId(device_id));
                });
            
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
    
                player.addListener('autoplay_failed', () => {
                    console.log('Autoplay is not allowed by the browser autoplay rules');                
                    dispatch(setBrowserBlocked(true))
                  });
            
                player.addListener('player_state_changed', ( state => {
                    if (!state) {
                        return;
                    }
                    player.getCurrentState().then( (state: Spotify.PlaybackState | null) => { 
                        if (state) {
                            if ((state.paused) && (state.position >= 30000) && (state.position < 30100)) {
                                console.log('browser paused, resume')
                                player.resume()
                            } else if (state.paused) {
                                console.log('user paused, setting active false')
                                active && dispatch(setActive(false))
                            } else {
                                if (!active) {
                                    console.log('track loaded in sdk, setting active true')
                                    dispatch(setActive(true)) 
                                }
                            }
                        } else {
                            console.log('no player state, setting active false')
                            active && dispatch(setActive(false))
                        }
                    });
                }));
                player.connect();
    
                player.on('playback_error', ({ message }) => {
                    console.error('Failed to perform playback', message);
                  });
            };            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return (
        <div data-allow='encrypted-media autoplay'>
            { 
                browserBlocked ? (
                    <Activate />
                ) : (
                    <Home/>
                )
            }
        </div>
    )
}

export default SpotifyPlayer