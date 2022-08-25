import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import { selectAccessToken } from "../../../store/auth/auth.selector";

import { PlayerContext } from '../../../contexts/player.context'

const Player = () => {

    // const authSession = useSelector(selectAuthSession)
    const accessToken = useSelector(selectAccessToken)

    const { setCurrentPlayer, setDeviceId, setActive, setNowPlaying } = useContext(PlayerContext)

    useEffect(() => {
        // const getAccessToken = async () => {
        //     try {
        //       const response = await fetch('/.netlify/functions/return-user-token', {
        //         method: 'post',
        //         headers: {
        //           'Content-Type': 'application/json'
        //         },   
        //         body: JSON.stringify({ authSession })
        //       })
        //       const {accessToken} = await response.json()
        //       return accessToken
        //     } catch(error) {
        //       console.log('nope ', error)
        //       window.alert('error retrieving access token, please contact app support.')
        //     }
        // }
        // const accessToken = getAccessToken()
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

                player.getCurrentState().then( state => { 
                    if ((state.paused) && (state.position >= 30000) && (state.position < 32000)) {
                        player.resume()
                    } else if (!state || state.paused) {
                        setActive(false)
                        setNowPlaying({hasTrack: false, track: {}, isLike: null})
                    } else {
                        setActive(true) 
                    }
                });
            }));
            player.connect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return <div allow='encrypted-media autoplay'></div>
}

export default Player