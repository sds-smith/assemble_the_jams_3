import { useContext, Fragment } from 'react'
import { useSelector } from 'react-redux'

import TrackActionButton from '../track-action-button/track-action-button.component'

import PlayBtn from '../../../assets/icons/play_white24.png'
import AddBtn from '../../../assets/icons/add_white24.png'
import ClearBtn from '../../../assets/icons/clear_white24.png'

import { Spotify } from '../../../utils/spotify'
import { selectAccessToken } from '../../../store/auth/auth.selector'
import { TrackContext } from '../../../contexts/track.context'
import { PlayerContext } from '../../../contexts/player.context'

import { TrackContainer, TrackInformation, TrackActionContainer } from './track.styles'
import { ProgressContainer } from '../../home-page-components/now-playing-card/now-playing-card.styles'

const Track = ({track, trackType }) => {
  const accessToken = useSelector(selectAccessToken)
  const { playlistTracks, setPlaylistTracks } = useContext(TrackContext)
  const { nowPlaying, setNowPlaying, deviceID, currentPlayer, active } = useContext(PlayerContext)

  const addTrack = () => {
    let tracks = playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    setPlaylistTracks(tracks => [...tracks])
  }

  const removeTrack = () => {
    let newTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    setPlaylistTracks(newTracks)
  }

  const playTrack = async () => {
    if (!nowPlaying.hasTrack) {
      const hasTrack = true
      const isLike = await Spotify.getLikeStatus(accessToken, track.id)
      const uri = `spotify:track:${track.id}`
      setNowPlaying({hasTrack, track, isLike})
      Spotify.play(deviceID, {
        playerInstance : currentPlayer,
        spotify_uri : uri,
      })
    }
  }

  let trackActions 
  switch(trackType) {
    case 'playlist' :
      trackActions =  <TrackActionButton onClick={removeTrack} src={ClearBtn} alt='button to remove track from playlist'/>
      break
    default :
      trackActions = (
                <Fragment>
                  <TrackActionButton onClick={playTrack} src={PlayBtn} alt='button to play track'/>
                  <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                </Fragment>
      )  
  }

    return (
        <TrackContainer >
            <TrackInformation >
              <h3 >{track.name}</h3>
              <p >{track.artist} | {track.album}</p>
            </TrackInformation>
            <TrackActionContainer>
              {trackActions}
            </TrackActionContainer>
            { nowPlaying.track.id === track.id && trackType !== 'playlist' &&
              <ProgressContainer 
                transform={ active ? 'scaleX(1)' : 'scaleX(0)' }
                transition={ active ? 'transform 30s linear' : 'transform 0s linear' } 
                backgroundColor='rgba(255, 255, 255, .2)'
              />}
        </TrackContainer>    
    )
}

export default Track