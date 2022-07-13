
import TrackList from "../../reusable-components/track-list/track-list.component"
import { PlaylistContainer, SaveToSpotifyButton } from './playlist.styles'

const Playlist = ({tracks, playlistName, setPlaylistName, onRemove, onSave, nowPlaying }) => {

    const clearInput = () => {
      setPlaylistName('')
    }

    const handleNameChange = (e) => {
      setPlaylistName(e.target.value)
    }

    return (
        <PlaylistContainer onKeyPress={(e) => e.key === 'Enter' && onSave()}>
          <input 
            id='playlist_name_input'
            placeholder={"Enter New Playlist Name"}
            value={playlistName}
            onClick={clearInput}
            onChange={handleNameChange}
          />
          <TrackList 
            tracks={tracks}
            onRemove={onRemove}
            nowPlaying={nowPlaying}
            trackType={'playlist'}/>
          <SaveToSpotifyButton onClick={onSave} >SAVE TO SPOTIFY</SaveToSpotifyButton>
        </PlaylistContainer>            
    )
}

export default Playlist