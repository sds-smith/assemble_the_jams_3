
import TrackActionButton from '../../reusable-components/track-action-button/track-action-button.component'

import SpotifyIcon from '../../../assets/icons/Spotify_Icon_RGB_Black.png'
import StopBtn from '../../../assets/icons/stop_black24.png'
import AddBtn from '../../../assets/icons/add_black24.png'

import {NowPlayingContainer, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls, LikesMessage, ProgressContainer} from './now-playing-card.styles'
import { useState, useEffect } from 'react'
import { Spotify } from '../../../utils/spotify'

const NowPlayingCard = ({ nowPlaying, setNowPlaying, deviceID, accessToken, addTrack, toggleLike, likesMessage, LikeOrUnlike}) => {

    const [transform, setTransform] = useState('scaleX(0)')

    const closeNowPlaying = () => {
        Spotify.stopPlayback(deviceID, accessToken)
        // clearInterval(interval)
        // setActive(false)
        setTransform('scaleX(0)')
        setNowPlaying({hasTrack: false, track: {}, isLike: null})
    }

    const nowPlayingInterval = () => {
        setTransform('scaleX(1)')
        setTimeout(() => {
            closeNowPlaying()
        }, 30000)
        // interval = setInterval( () => {
            // setGradientAngle(gradientAngle => (gradientAngle - 2))
        // }, 1000)
    }

    useEffect(() => {
        nowPlayingInterval()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <NowPlayingContainer >
            <SpotifyAttributor className='listen-on' href={`https://open.spotify.com/track/${nowPlaying.track.id}`} target='_blank' rel="noreferrer">
                    <SpotifyLogo src={SpotifyIcon} id='spotify-icon' alt='spotify icon'/>
                    <p>Listen on Spotify</p>
            </SpotifyAttributor>
            <NowPlayingCover  src={nowPlaying.track.cover} 
                 alt="now playing cover art" 
            />
            <NowPlayingLabel>
                <div >{nowPlaying.track.name}</div>
                <div >{nowPlaying.track.artist}</div>
            </NowPlayingLabel>
            <TrackControls>
                 <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                 <TrackActionButton onClick={toggleLike} src={LikeOrUnlike} alt='button to add/remove song from liked songs' />
                 <TrackActionButton onClick={closeNowPlaying} src={StopBtn} alt='play or pause button'/>
            </TrackControls>   
            <LikesMessage>{likesMessage}</LikesMessage>
            <ProgressContainer style={{transform : transform}} />
        </NowPlayingContainer>
    )
}

export default NowPlayingCard