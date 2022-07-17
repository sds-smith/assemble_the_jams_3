import { useContext } from "react"

import PlaylistNameInput from '../playlist-name-input/playlist-name-input.component'
import TrackList from "../../reusable-components/track-list/track-list.component"

import editIcon from '../../../assets/icons/edit_white24.png'

import { UserContext } from "../../../contexts/user.context"
import { TrackContext } from "../../../contexts/track.context"
import { useMediaQuery } from '../../../utils/customHooks'
import { Spotify } from "../../../utils/spotify"
import { PlaylistContainer, TitleContainer,  SaveToSpotifyButton } from './playlist.styles'

const Playlist = () => {
    const { accessToken, currentUser } = useContext(UserContext)
    const { playlistTracks, setPlaylistTracks, playlistName, setPlaylistName } = useContext(TrackContext)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    const savePlaylist = async () => {
      const trackURIs = playlistTracks.map(track => track.uri)
      try {
        const response = await Spotify.savePlaylist(accessToken, currentUser, playlistName, trackURIs)
        setPlaylistName(response.playlistName)
        setPlaylistTracks(response.playlistTracks)
      } catch(error) {
        console.log(error)
      }
    }

    return (
        <PlaylistContainer isMobile={isMobile} onKeyPress={(e) => e.key === 'Enter' && savePlaylist()}>
          <TitleContainer>
            <img src={editIcon} alt='edit playlist name' />
            <PlaylistNameInput width='unset' />
          </TitleContainer>
          <TrackList 
            tracks={playlistTracks}
            trackType={'playlist'}/>
          <SaveToSpotifyButton onClick={savePlaylist} >SAVE TO SPOTIFY</SaveToSpotifyButton>
        </PlaylistContainer>            
    )
}

export default Playlist