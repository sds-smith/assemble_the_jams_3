import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import { selectAccessToken } from '../../../store/auth/auth.selector'
import { PlayerContext } from '../../../contexts/player.context'
import { UserContext } from "../../../contexts/user.context";

const Player = () => {
    const accessToken = useSelector(selectAccessToken)

    const { setCurrentPlayer, setDeviceId } = useContext(PlayerContext)
    const { currentUser } = useContext(UserContext)

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
    },[])

    return <div allow='encrypted-media'></div>
}

export default Player