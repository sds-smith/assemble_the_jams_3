import { useState, useContext, Fragment, FC, ImgHTMLAttributes } from 'react'

import TrackActionButton from '../track-action-button/track-action-button.component'
import ProgressBar from '../progress-bar/progress-bar.component'
import ActionMessage from '../action-message/action-message.component'

import PlayBtn from '../../../assets/icons/play_white24.png'
import StopBtn from '../../../assets/icons/stop_white24.png'

import AddBtn from '../../../assets/icons/add_white24.png'
import ClearBtn from '../../../assets/icons/clear_white24.png'
import SpotifyLogoWhite from '../../../assets/icons/Spotify_Logo_RGB_White.png'

import { useTrackControls } from '../../../utils/custom-hooks/use-track-controls'

import { PlayerContext } from '../../../contexts/player.context'

import { TrackContainer, CoverContainer, TrackInformation, TrackActionContainer, TrackCover, SpotifyLogo } from './track.styles'
import { TrackType } from '../../../store/track/track.types'

type TrackProps = {
  track: TrackType;
  trackType: string;
} & ImgHTMLAttributes<HTMLImageElement>

const Track: FC<TrackProps> = ({track, trackType }) => {
  const [message, setMessage] = useState('')
  const { play, stopPlayback, addTrack, removeTrack } = useTrackControls(track)

  const { currentPlayer, nowPlaying } = useContext(PlayerContext)

  const isActiveTrack = nowPlaying.track.id === track.id
  const playActionButton = isActiveTrack ? StopBtn : PlayBtn
  
  const playAction = async () => {
    if (isActiveTrack) {
      stopPlayback()
    } else {
      currentPlayer && await currentPlayer.activateElement()
      const playMessage = await play()
      setMessage(playMessage)
      window.setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }

  let trackActions 
  switch(trackType) {
    case 'playlist' :
      trackActions = (
                <Fragment>
                  <TrackActionButton onClick={playAction} src={playActionButton} alt='button to play track'/>
                  <TrackActionButton onClick={removeTrack} src={ClearBtn} alt='button to remove track from playlist'/>
                </Fragment>
        )  
      break
    default :
      trackActions = (
                <Fragment>
                  <TrackActionButton onClick={playAction} src={playActionButton} alt='button to play track'/>
                  <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                </Fragment>
      )  
  }

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
              <ActionMessage >{message}</ActionMessage>
              {trackActions}
            </TrackActionContainer>
            { isActiveTrack &&
              <ProgressBar lightBackground />}
        </TrackContainer>    
    )
}

export default Track
