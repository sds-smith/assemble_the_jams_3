import { FC, InputHTMLAttributes, ChangeEvent } from "react"
import { useSelector, useDispatch } from "react-redux"

import { selectPlaylistName } from '../../../store/track/track.selector'
import { setPlaylistName } from "../../../store/track/track.action"
import { NameInput } from "./playlist-name-input.styles"

type PlaylistNameInputProps = {
  width?: string;
} & InputHTMLAttributes<HTMLInputElement>

const PlaylistNameInput: FC<PlaylistNameInputProps> = ({ width }) => {

    const dispatch = useDispatch()
    const playlistName = useSelector(selectPlaylistName)
    
    const clearInput = () => {
     dispatch(setPlaylistName(''))
    }
  
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
     dispatch(setPlaylistName(e.target.value))
    }

    return (
            <NameInput 
              placeholder={"Name Your New Playlist"}
              value={playlistName}
              onClick={clearInput}
              onChange={handleNameChange}
              width={width || '287px'}
            />
    )
}

export default PlaylistNameInput