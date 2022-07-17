import { useContext } from "react"

import { TrackContext } from "../../../contexts/track.context"
import { PlaylistNameContainer, NameInput } from "./playlist-name-input.styles"

const PlaylistNameInput = () => {

    const { playlistName, setPlaylistName } = useContext(TrackContext)
    
    const clearInput = () => {
     setPlaylistName('')
    }
  
    const handleNameChange = (e) => {
     setPlaylistName(e.target.value)
    }

    return (
        <PlaylistNameContainer >
            <NameInput 
              placeholder={"Name Your New Playlist"}
              value={playlistName}
              onClick={clearInput}
              onChange={handleNameChange}
            />
        </PlaylistNameContainer>
    )
}

export default PlaylistNameInput