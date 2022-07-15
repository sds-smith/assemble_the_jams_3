import { useContext, Fragment } from 'react'

import TrackActionButton from '../track-action-button/track-action-button.component'

import PlayBtn from '../../../assets/icons/play_white24.png'
import AddBtn from '../../../assets/icons/add_white24.png'
import ClearBtn from '../../../assets/icons/clear_white24.png'

import { Spotify } from '../../../utils/spotify'
import { UserContext } from '../../../contexts/user.context'
import { TrackContext } from '../../../contexts/track.context'
import { PlayerContext } from '../../../contexts/player.context'

import { TrackContainer, TrackInformation, TrackActionContainer, ReverseTrackContainer, ReverseTrackInformation } from './track.styles'
import { ProgressContainer } from '../../home-page-components/now-playing-card/now-playing-card.styles'

const Track = ({track, trackType }) => {
  const { accessToken } = useContext(UserContext)
  const { playlistTracks, setPlaylistTracks } = useContext(TrackContext)
  const { nowPlaying, setNowPlaying, deviceID, currentPlayer } = useContext(PlayerContext)

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
      setNowPlaying({hasTrack, track, isLike})
      const uri = `spotify:track:${track.id}`
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
    case 'search-results' :
      trackActions = (
                <Fragment>
                  <TrackActionButton onClick={playTrack} src={PlayBtn} alt='button to play track'/>
                  <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                </Fragment>

      )  
      break
    case 'recommendations' :
      trackActions = (
                <Fragment>
                  <TrackActionButton onClick={addTrack} src={AddBtn} alt='button to add track to playlist'/>
                  <TrackActionButton onClick={playTrack} src={PlayBtn} alt='button to play track'/>     
                </Fragment>

      )  
      break
    default : 
      trackActions = <div></div>
  }

    return (
       trackType === 'recommendations' ? (
        <ReverseTrackContainer >
            <ReverseTrackInformation >
              <h3 >{track.name}</h3>
              <p >{track.artist} | {track.album}</p>
            </ReverseTrackInformation>
            {trackActions}
        </ReverseTrackContainer>   
      ) : (
        <TrackContainer >
            <TrackInformation >
              <h3 >{track.name}</h3>
              <p >{track.artist} | {track.album}</p>
            </TrackInformation>
            <TrackActionContainer>
              {trackActions}
            </TrackActionContainer>
        </TrackContainer>    
      )
    )
}

export default Track