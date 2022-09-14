import { useState, useEffect, useContext } from 'react'

import TrackActionButton from '../../../reusable-components/track-action-button/track-action-button.component'
import ActionMessage from '../../../reusable-components/action-message/action-message.component'
import ProgressBar from '../../../reusable-components/progress-bar/progress-bar.component'

import SpotifyIcon from '../../../../assets/icons/Spotify_Icon_RGB_Black.png'
import StopBtn from '../../../../assets/icons/stop_black24.png'
import AddBtn from '../../../../assets/icons/add_black24.png'
import Like from '../../../../assets/icons/like24.png'
import Unlike from '../../../../assets/icons/unlike24.png'

import { useTrackControls } from '../../../../utils/custom-hooks/use-track-controls'

import { PlayerContext } from '../../../../contexts/player.context'
import { useMediaQuery } from '../../../../utils/custom-hooks/use-media-query'
import {NowPlayingContainer, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls} from './now-playing-card.styles'

const NowPlayingCard = () => {
    const [likesMessage, setLikesMessage] = useState('')

    const { nowPlaying } = useContext(PlayerContext)
    const track = nowPlaying.track
    const isMobile = useMediaQuery('(max-width: 1020px)')
    const { stopPlayback, addTrack, toggleLike } = useTrackControls(track)

    const LikeAction = async () => {
        const message = await toggleLike()
        setLikesMessage(message)
        setTimeout(() => setLikesMessage(''), 3000);
    }

    useEffect(() => {
        const timer = setTimeout(() => stopPlayback(), 30000)
        return () => {
            clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let LikeOrUnlike = nowPlaying.isLike ? Like : Unlike
    const nowPlayingCover = nowPlaying.track.cover ? nowPlaying.track.cover : ''

    return (
        <NowPlayingContainer isMobile={isMobile} >
            <SpotifyAttributor href={`https://open.spotify.com/track/${nowPlaying.track.id}?play`} target='_blank' rel="noreferrer">
                    <SpotifyLogo src={SpotifyIcon} id='spotify-icon' alt='spotify icon'/>
                    <p>Listen on Spotify</p>
            </SpotifyAttributor>
            <NowPlayingCover  
                src={nowPlayingCover} 
                 alt="now playing cover art" 
            />
            <NowPlayingLabel>
                <div >{nowPlaying.track.name}</div>
                <div >{nowPlaying.track.artist}</div>
            </NowPlayingLabel>
            <TrackControls>
                 <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                 <TrackActionButton onClick={LikeAction} src={LikeOrUnlike} alt='button to add/remove song from liked songs' />
                 <TrackActionButton onClick={stopPlayback} src={StopBtn} alt='play or pause button'/>
            </TrackControls>   
            <ActionMessage bottom='2.2rem' right='10px'>{likesMessage}</ActionMessage>
            <ProgressBar darkBackground />
        </NowPlayingContainer>
    )
}

export default NowPlayingCard