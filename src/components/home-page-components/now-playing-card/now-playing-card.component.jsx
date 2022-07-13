
import TrackActionButton from '../../reusable-components/track-action-button/track-action-button.component'

import SpotifyIcon from '../../../assets/icons/Spotify_Icon_RGB_Black.png'
import StopBtn from '../../../assets/icons/stop_black24.png'
import AddBtn from '../../../assets/icons/add_black24.png'

import {Player, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls, LikesMessage, ProgressContainer, ProgressBar, ProgressFill} from './now-playing-card.styles'
import { useEffect } from 'react'

const NowPlayingCard = ({ nowPlaying, nowPlayingInterval, currentPlayer, closeNowPlaying, interval, addTrack, toggleLike, likesMessage, playerPosition, LikeOrUnlike}) => {

    let currentPosition = playerPosition / 1000
    let positionMins = Math.floor(currentPosition / 60).toString()
    let positionSec = (currentPosition % 60).toFixed(0).toString()
    positionSec = positionSec.length < 2 ? '0' + positionSec : positionSec

    let remainingSec = (30 - positionSec).toFixed(0).toString()
    remainingSec = remainingSec.length < 2 ? '0' + remainingSec : remainingSec

    // const progress = (playerPosition/3000)*100

    useEffect(() => {
        nowPlayingInterval(currentPlayer)
    }, [])

    return (
        <Player >
            <SpotifyAttributor className='listen-on' href='https://open.spotify.com/' target='_blank' rel="noreferrer">
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
                 <TrackActionButton onClick={()=>closeNowPlaying(interval)} src={StopBtn} alt='play or pause button'/>
            </TrackControls>   
            <LikesMessage>{likesMessage}</LikesMessage>
            <ProgressContainer>
                {/* <p>{`${positionMins}:${positionSec}`}</p> */}
                {/* <ProgressBar> */}
                    {/* <ProgressFill width={`${progress}%`} /> */}
                {/* </ProgressBar> */}
                {/* <p>{`0:${remainingSec}`}</p> */}
            </ProgressContainer>
        </Player>
    )
}

export default NowPlayingCard