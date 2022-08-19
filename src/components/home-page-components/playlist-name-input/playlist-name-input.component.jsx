import { useSelector, useDispatch } from "react-redux"

import { selectPlaylistName } from '../../../store/track/track.selector'
import { setPlaylistName } from "../../../store/track/track.action"
import { PlaylistNameContainer, NameInput } from "./playlist-name-input.styles"

const PlaylistNameInput = ({ width }) => {

    const dispatch = useDispatch()
    const playlistName = useSelector(selectPlaylistName)
    
    const clearInput = () => {
     dispatch(setPlaylistName(''))
    }
  
    const handleNameChange = (e) => {
     dispatch(setPlaylistName(e.target.value))
    }

    return (
        <PlaylistNameContainer >
            <NameInput 
              placeholder={"Name Your New Playlist"}
              value={playlistName}
              onClick={clearInput}
              onChange={handleNameChange}
              width={width}
            />
        </PlaylistNameContainer>
    )
}

export default PlaylistNameInput