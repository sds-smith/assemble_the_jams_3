import { InputHTMLAttributes, FC, ChangeEvent } from "react"
import { useSelector, useDispatch } from "react-redux"

import { selectPlaylistName } from '../../../store/track/track.selector'
import { setPlaylistName } from "../../../store/track/track.action"
import { NameInput } from "./playlist-name-input.styles"

const PlaylistNameInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ width }) => {

    const dispatch = useDispatch()
    const playlistName = useSelector(selectPlaylistName)
    
    const clearInput = () => {
     dispatch(setPlaylistName(''))
    }
  
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
     dispatch(setPlaylistName(event.target.value))
    }

    return (
            <NameInput 
              placeholder={"Name Your New Playlist"}
              value={playlistName}
              onClick={clearInput}
              onChange={handleNameChange}
              width={width}
            />
    )
}

export default PlaylistNameInput