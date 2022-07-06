
import TrackList from "../../reusable-components/track-list/track-list.component"
import Button from "../../reusable-components/button/button.component"
import { PlaylistContainer, SaveToSpotifyButton } from './playlist.styles'

const Playlist = ({playlistTracks, playlistName}) => {

    const clearInput = () => {
        console.log('clearInput')
    }

    const handleNameChange = () => {
        console.log('handleNameChange')
    }

    const onRemove = () => {
        console.log('onRemove')
    }

    const onSave = () => {
        console.log('onSave')
    }

    return (
        <PlaylistContainer onKeyPress={(e) => e.key === 'Enter' && onSave()}>
          <input 
            id='playlist_name_input'
            placeholder={playlistName}
            defaultValue={playlistName}
            onClick={clearInput}
            onChange={handleNameChange}
          />
          <TrackList 
            tracks={playlistTracks}
            onRemove={onRemove}
            trackType={'playlist'}/>
          <SaveToSpotifyButton onClick={onSave} >SAVE TO SPOTIFY</SaveToSpotifyButton>
        </PlaylistContainer>            
    )
}

export default Playlist