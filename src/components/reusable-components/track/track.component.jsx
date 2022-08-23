import { useContext, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TrackActionButton from '../track-action-button/track-action-button.component'

import PlayBtn from '../../../assets/icons/play_white24.png'
import AddBtn from '../../../assets/icons/add_white24.png'
import ClearBtn from '../../../assets/icons/clear_white24.png'

import { Spotify } from '../../../utils/spotify'
import { Preview } from '../../../utils/preview'
import { selectAuthSession } from '../../../store/auth/auth.selector'
import { selectPlaylistTracks } from '../../../store/track/track.selector'
import { setPlaylistTracks } from '../../../store/track/track.action'
import { PlayerContext } from '../../../contexts/player.context'

import { TrackContainer, TrackInformation, TrackActionContainer, TrackCover } from './track.styles'
import { ProgressContainer } from '../../home-page-components/now-playing-card/now-playing-card.styles'

const Track = ({track, trackType }) => {
  const dispatch = useDispatch()

  const authSession = useSelector(selectAuthSession)
  const playlistTracks = useSelector(selectPlaylistTracks)
  const { nowPlaying, setNowPlaying, deviceID, currentPlayer, active, setActive } = useContext(PlayerContext)

  const addTrack = () => {
    let tracks = playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    dispatch(setPlaylistTracks(tracks))
  }

  const removeTrack = () => {
    let newTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    dispatch(setPlaylistTracks(newTracks))
  }

  const playPreview = async () => {
    if (!track.preview) {
      window.alert('Please sign in with Spotify to preview this track')
      return;
    }
    if (!nowPlaying.hasTrack) {
      const audioPreview = new Audio(track.preview);
      audioPreview.volume = 0.5;
      const hasTrack = true
      const isLike = false
      setNowPlaying({hasTrack, track, isLike})
      Preview.playPreview(audioPreview)
    }  
  };

  const playTrack = async () => {
      if (!nowPlaying.hasTrack) {
        const hasTrack = true
        const isLike = await Spotify.getLikeStatus(authSession, track.id)
        const uri = `spotify:track:${track.id}`
        setNowPlaying({hasTrack, track, isLike})
        Spotify.play(deviceID, {
          playerInstance : currentPlayer,
          spotify_uri : uri,
        })
      }
  }

  const play = () => {
    if (currentPlayer) {
      currentPlayer.activateElement()
      playTrack()
    } else {
      playPreview()
    }
  }

  let trackActions 
  switch(trackType) {
    case 'playlist' :
      trackActions = (
                <Fragment>
                  <TrackActionButton onClick={play} src={PlayBtn} alt='button to play track'/>
                  <TrackActionButton onClick={removeTrack} src={ClearBtn} alt='button to remove track from playlist'/>
                </Fragment>
        )  
      break
    default :
      trackActions = (
                <Fragment>
                  <TrackActionButton onClick={play} src={PlayBtn} alt='button to play track'/>
                  <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                </Fragment>
      )  
  }

    return (
        <TrackContainer >
            <TrackCover src={track.cover} alt='album cover'/>
            <TrackInformation >
              <h3 >{track.name}</h3>
              <p >{track.artist} | {track.album}</p>
            </TrackInformation>
            <TrackActionContainer>
              {trackActions}
            </TrackActionContainer>
            { nowPlaying.track.id === track.id &&
              <ProgressContainer 
                transform={ active ? 'scaleX(1)' : 'scaleX(0)' }
                transition={ active ? 'transform 30s linear' : 'transform 0s linear' } 
                backgroundColor='rgba(255, 255, 255, .2)'
              />}
        </TrackContainer>    
    )
}

export default Track