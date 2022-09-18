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
import { ResponsiveContext } from '../../../../contexts/responsive.context'
import {NowPlayingContainer, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls} from './now-playing-card.styles'

const NowPlayingCard = () => {
    const [likesMessage, setLikesMessage] = useState('')

    const { nowPlaying } = useContext(PlayerContext)
    const track = nowPlaying.track
    const { isMobile } = useContext(ResponsiveContext) 
    const { stopPlayback, addTrack, toggleLike } = useTrackControls(track)

    const LikeAction = async () => {
        const message = await toggleLike()
        setLikesMessage(`${track.name} ${message}`)
        setTimeout(() => setLikesMessage(''), 3000);
    }

    const add = async () => {
        const message = await addTrack()
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
                 <TrackActionButton onClick={add} src={AddBtn} alt='button to add track to playlist'/>
                 <TrackActionButton onClick={LikeAction} src={LikeOrUnlike} alt='button to add/remove song from liked songs' />
                 <TrackActionButton onClick={stopPlayback} src={StopBtn} alt='play or pause button'/>
            </TrackControls>   
            <ActionMessage position='absolute' bottom='2.2rem' right='10px'>{likesMessage}</ActionMessage>
            <ProgressBar darkBackground />
        </NowPlayingContainer>
    )
}

export default NowPlayingCard