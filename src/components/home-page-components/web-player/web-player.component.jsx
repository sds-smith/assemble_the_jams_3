import { useEffect, useState } from 'react'

import NowPlayingCard from '../now-playing-card/now-playing-card.component'

import Like from '../../../assets/icons/like24.png'
import Unlike from '../../../assets/icons/unlike24.png'

import { Spotify } from '../../../utils/spotify'

import { WebPlayerContainer } from "./web-player.styles"

const WebPlayer = ({ accessToken, gradientAngle, setGradientAngle, deviceID, setDeviceId, currentPlayer, setCurrentPlayer, nowPlaying, setNowPlaying, onAdd }) => {

    const [playerPosition, setPlayerPosition] = useState(0)
    const [active, setActive] = useState(false)
    const [likesMessage, setLikesMessage] = useState('')

    let interval

    const closeNowPlaying = (interval) => {
        Spotify.stopPlayback(deviceID, accessToken)
        clearInterval(interval)
        setActive(false)
        setNowPlaying({hasTrack: false, track: {}, isLike: null})
    }

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

    const nowPlayingInterval = () => {
        setTimeout(() => {
            closeNowPlaying(interval)
        }, 30000)
        interval = setInterval( () => {
            setGradientAngle(gradientAngle => (gradientAngle - 2))
        }, 1000)
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
                
                    player.getCurrentState().then( state => {
                        if (!state) {
                            setActive(false)
                        } else {
                            setActive(true)
                        }
                    })
                }));
                player.connect();
            };
    },[])

    let LikeOrUnlike = nowPlaying.isLike ? Like : Unlike
    
    return (
        <WebPlayerContainer  >        
            { nowPlaying.hasTrack &&
                <NowPlayingCard nowPlaying={nowPlaying} nowPlayingInterval={nowPlayingInterval} currentPlayer={currentPlayer} closeNowPlaying={closeNowPlaying} interval={interval} addTrack={addTrack} toggleLike={toggleLike} likesMessage={likesMessage} playerPosition={playerPosition} LikeOrUnlike={LikeOrUnlike} />
            }
        </WebPlayerContainer>
    )
}

export default WebPlayer