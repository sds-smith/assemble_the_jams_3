import { useEffect, useState } from 'react'

import NowPlayingCard from '../now-playing-card/now-playing-card.component'

import Like from '../../../assets/icons/like24.png'
import Unlike from '../../../assets/icons/unlike24.png'

import { Spotify } from '../../../utils/spotify'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = ({ accessToken, deviceID, setDeviceId, currentPlayer, setCurrentPlayer, nowPlaying, setNowPlaying, onAdd }) => {

    // const [playerPosition, setPlayerPosition] = useState(0)
    // const [active, setActive] = useState(false)
    const [likesMessage, setLikesMessage] = useState('')

    // let interval


    const toggleLike = () => {
        if (!nowPlaying.track.id) {
            return
          }
          if (nowPlaying.isLike) {
            Spotify.deleteLike(accessToken, nowPlaying.track.id)
            setNowPlaying(nowPlaying => ({...nowPlaying, isLike: false}))
            setLikesMessage('Removed from Liked Songs')
            setTimeout(() => setLikesMessage(''), 3000);
          } else {
            Spotify.addLike(accessToken, nowPlaying.track.id)
            setNowPlaying(nowPlaying => ({...nowPlaying, isLike: true}))
            setLikesMessage('Added to Liked Songs')
            setTimeout(() => setLikesMessage(''), 3000);
          }
    }

    const addTrack = () => {
        onAdd(nowPlaying.track)
    }


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
                
                    // setPlayerPosition(state.position)
                
                    // player.getCurrentState().then( state => {
                        // if (!state) {
                            // setActive(false)
                        // } else {
                            // setActive(true)
                        // }
                    // })
                }));
                player.connect();
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    let LikeOrUnlike = nowPlaying.isLike ? Like : Unlike
    
    return (
        <WebPlayerContainer  >        
            { nowPlaying.hasTrack &&
                <NowPlayingCard nowPlaying={nowPlaying} setNowPlaying={setNowPlaying} deviceID={deviceID} accessToken={accessToken} addTrack={addTrack} toggleLike={toggleLike} likesMessage={likesMessage} LikeOrUnlike={LikeOrUnlike} />
            }
        </WebPlayerContainer>
    )
}

export default WebPlayer