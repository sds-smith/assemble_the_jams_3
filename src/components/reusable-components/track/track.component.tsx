import { useState, FC, ImgHTMLAttributes } from 'react'
import { useSelector } from 'react-redux'

import TrackActionButton from '../track-action-button/track-action-button.component'
import ProgressBar from '../progress-bar/progress-bar.component'
import ActionMessage from '../action-message/action-message.component'

import SpotifyLogoWhite from '../../../assets/icons/Spotify_Logo_RGB_White.png'
import { TRACK_ACTION_BUTTON_CLASSES } from '../track-action-button/track-action-button.component'
import { selectNowPlaying } from '../../../store/player/player.selector'
import { TrackType } from '../../../store/track/track.types'

import { TrackContainer, CoverContainer, TrackInformation, TrackActionContainer, TrackCover, SpotifyLogo } from './track.styles'

type TrackProps = {
  track: TrackType;
  trackType: string;
} & ImgHTMLAttributes<HTMLImageElement>

const Track: FC<TrackProps> = ({track, trackType }) => {
  const [message, setMessage] = useState('')
  const nowPlaying = useSelector(selectNowPlaying)

  const isActiveTrack = nowPlaying.track.id === track.id
  const trackCover = track.cover ? track.cover : ''

  return (
      <TrackContainer >
          <CoverContainer>
            <TrackCover src={trackCover} alt='album cover'/>
            <SpotifyLogo src={SpotifyLogoWhite} id='spotify-logo' alt='Spotify Logo'/>
          </CoverContainer>
          <TrackInformation >
            <h3 >{track.name}</h3>
            <p >{track.artist} | {track.album}</p>
          </TrackInformation>
          <TrackActionContainer>
            <ActionMessage position='absolute' right='20px' >{message}</ActionMessage>
            <TrackActionButton 
              buttonType={isActiveTrack ? TRACK_ACTION_BUTTON_CLASSES.STOP_WHITE : TRACK_ACTION_BUTTON_CLASSES.PLAY} 
              track={track}
              setMessage={setMessage}
            />
            <TrackActionButton 
              buttonType={trackType === 'playlist' ? TRACK_ACTION_BUTTON_CLASSES.REMOVE : TRACK_ACTION_BUTTON_CLASSES.ADD_WHITE} 
              track={track}
            />
          </TrackActionContainer>
          { isActiveTrack &&
            <ProgressBar lightBackground />
          }
      </TrackContainer>    
  )
}

export default Track
