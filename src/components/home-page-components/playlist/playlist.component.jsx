import { useContext } from "react"

import TrackList from "../../reusable-components/track-list/track-list.component"

import { TrackContext } from "../../../contexts/track.context"
import { PlaylistContainer, SaveToSpotifyButton } from './playlist.styles'

const Playlist = ({ onRemove, onSave }) => {

    const { playlistTracks, playlistName, setPlaylistName } = useContext(TrackContext)

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
            tracks={playlistTracks}
            onRemove={onRemove}
            trackType={'playlist'}/>
          <SaveToSpotifyButton onClick={onSave} >SAVE TO SPOTIFY</SaveToSpotifyButton>
        </PlaylistContainer>            
    )
}

export default Playlist