import { useState, useEffect, useContext } from 'react'

import TrackActionButton from '../../../reusable-components/track-action-button/track-action-button.component'
import ActionMessage from '../../../reusable-components/action-message/action-message.component'
import ProgressBar from '../../../reusable-components/progress-bar/progress-bar.component'

import SpotifyIcon from '../../../../assets/icons/Spotify_Icon_RGB_Black.png'


import { TRACK_ACTION_BUTTON_CLASSES } from '../../../reusable-components/track-action-button/track-action-button.component'

import { useTrackControls } from '../../../../utils/custom-hooks/use-track-controls'

import { PlayerContext } from '../../../../contexts/player.context'
import { ResponsiveContext } from '../../../../contexts/responsive.context'
import {NowPlayingContainer, SpotifyAttributor, SpotifyLogo, NowPlayingCover, NowPlayingLabel, TrackControls} from './now-playing-card.styles'

const NowPlayingCard = () => {
    const [likesMessage, setLikesMessage] = useState('')

    const { nowPlaying } = useContext(PlayerContext)
    const track = nowPlaying.track
    const { isMobile } = useContext(ResponsiveContext) 
    const { stopPlayback } = useTrackControls(track)

    const nowPlayingCover = nowPlaying.track.cover ? nowPlaying.track.cover : ''

    useEffect(() => {
        const timer = setTimeout(() => stopPlayback(), 30000)
        return () => {
            clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                 <TrackActionButton 
                    buttonType={TRACK_ACTION_BUTTON_CLASSES.ADD_BLACK} 
                    track={track} 
                    setMessage={setLikesMessage}
                 />
                 <TrackActionButton 
                    buttonType={nowPlaying.isLike ? TRACK_ACTION_BUTTON_CLASSES.LIKE : TRACK_ACTION_BUTTON_CLASSES.UNLIKE} 
                    track={track} 
                    setMessage={setLikesMessage} 
                 />
                 <TrackActionButton 
                    buttonType={TRACK_ACTION_BUTTON_CLASSES.STOP_BLACK} 
                    track={track} 
                 />
            </TrackControls>   
            <ActionMessage position='absolute' bottom='2.2rem' right='10px'>{likesMessage}</ActionMessage>
            <ProgressBar darkBackground />
        </NowPlayingContainer>
    )
}

export default NowPlayingCard