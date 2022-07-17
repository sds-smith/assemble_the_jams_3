import { useState, useContext } from "react"

import Button from "../../reusable-components/button/button.component"

import { Spotify } from "../../../utils/spotify"
import { UserContext } from "../../../contexts/user.context"
import { PlayerContext } from "../../../contexts/player.context"
import { TrackContext } from "../../../contexts/track.context"
import { PlaylistNameContainer, NameInput } from "./playlist-name-input.styles"

const PlaylistNameInput = () => {

    const { accessToken } = useContext(UserContext)
    const { currentPlayer } = useContext(PlayerContext)
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