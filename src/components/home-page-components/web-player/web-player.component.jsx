import { useEffect, useState } from 'react'

import TrackActionButton from '../../reusable-components/track-action-button/track-action-button.component'

import SpotifyIcon from '../../../assets/icons/Spotify_Icon_RGB_Black.png'
import PlayBtn from '../../../assets/icons/play_black24.png'
import AddBtn from '../../../assets/icons/add_black24.png'
import Like from '../../../assets/icons/like24.png'
import Unlike from '../../../assets/icons/unlike24.png'

import { WebPlayerContainer, Player, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls, ProgressContainer, ProgressBar, ProgressFill } from "./web-player.styles"

const WebPlayer = ({authSession, hasAccessToken}) => {

    const [player, setPlayer] = useState(undefined);

    const togglePlay = () => {
        console.log('toggle play')
    }

    const toggleLike = () => {
        console.log('toggle like')
    }

    const addTrack = () => {
        console.log('add track')
    }

    let LikeOrUnlike = Unlike
    let positionMins = '2'
    let positionSec = '30'
    let durationMins = '5'
    let durationSec = '0'
    let progress = '50'
    
    useEffect(() => {
        if ( hasAccessToken ) {
            const getToken = async (authSession) => {
                try {
                    const response = await fetch('/.netlify/functions/token', {
                        method: 'post',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({authSession})
                      })
                      const {token} = await response.json()
                      return token
                } catch(error) {
                    window.alert({error})
                }
            }
        
            const token = getToken()
        
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
        
            document.body.appendChild(script);
        
            window.onSpotifyWebPlaybackSDKReady = () => {
                
                const player = new window.Spotify.Player({
                    name: 'Assemble the Jams',
                    getOAuthToken: cb => { cb(token); },
                    volume: 0.5
                });
            
                setPlayer(player);
            
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });
            
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
            
            
                player.connect();
            
        }

        };
    }, [hasAccessToken]);
    
    return (
        <WebPlayerContainer>
            <Player >
                <SpotifyAttributor className='listen-on' href='https://open.spotify.com/' target='_blank' rel="noreferrer">
                        <SpotifyLogo src={SpotifyIcon} id='spotify-icon' alt='spotify icon'/>
                        <p>Listen on Spotify</p>
                </SpotifyAttributor>

                <NowPlayingCover  src={"https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n"} 
                     alt="" 
                />
                <NowPlayingLabel>
                    <div >{'current_track.name'}</div>
                    <div >{'current_track.artists[0].name'}</div>
                </NowPlayingLabel>
                <TrackControls>
                     <TrackActionButton onClick={togglePlay} src={PlayBtn} alt='play or pause button'/>
                     <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                     <TrackActionButton onClick={toggleLike} src={LikeOrUnlike} alt='button to add/remove song from liked songs' />
                </TrackControls>   
                {/* <p id='likesMessage'></p> */}
                <ProgressContainer>
                    <p>{`${positionMins}:${positionSec}`}</p>
                    <ProgressBar>
                        <ProgressFill width={`${progress}%`} />
                    </ProgressBar>
                    <p>{`${durationMins}:${durationSec}`}</p>
                </ProgressContainer>
            </Player>
        </WebPlayerContainer>
    )
}

export default WebPlayer