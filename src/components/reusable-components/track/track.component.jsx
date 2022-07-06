import { Fragment } from 'react'
import TrackActionButton from '../track-action-button/track-action-button.component'

import PlayBtn from '../../../assets/icons/play_white24.png'
import AddBtn from '../../../assets/icons/add_white24.png'
import ClearBtn from '../../../assets/icons/clear_white24.png'
import { TrackContainer, TrackInformation, TrackActionContainer, ReverseTrackContainer, ReverseTrackInformation } from './track.styles'

const Track = ({track, trackType, onAdd, onRemove, onPlay}) => {

  const addTrack = () => {
    onAdd(track)
  }

  const removeTrack = () => {
    onRemove(track)
  }

  const playTrack = () => {
    console.log('playTrack')
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