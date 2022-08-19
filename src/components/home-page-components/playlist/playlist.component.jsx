import { useContext, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import PlaylistNameInput from '../playlist-name-input/playlist-name-input.component'
import TrackList from "../../reusable-components/track-list/track-list.component"

import editIcon from '../../../assets/icons/edit_white24.png'

import { selectAccessToken } from "../../../store/auth/auth.selector"
import { selectPlaylistTracks, selectPlaylistName } from '../../../store/track/track.selector'
import { setPlaylistTracks, setPlaylistName, setSearchResults } from '../../../store/track/track.action'
import { UserContext } from "../../../contexts/user.context"
import { useMediaQuery } from '../../../utils/customHooks'
import { Spotify } from "../../../utils/spotify"
import { generateRandomString } from '../../../utils/random-state-generator'
import { setAuthSession } from '../../../store/auth/auth.action'
import { PlaylistContainer, TitleContainer,  SaveToSpotifyButton } from './playlist.styles'

const Playlist = () => {
    const accessToken = useSelector(selectAccessToken)
    const { currentUser } = useContext(UserContext)
    const dispatch = useDispatch()

    const playlistTracks = useSelector(selectPlaylistTracks)
    const playlistName = useSelector(selectPlaylistName)
    const isMobile = useMediaQuery('(max-width: 1020px)')

    const signIn = async () => {
      const session = generateRandomString()
      dispatch(setAuthSession(session))
      try {
          const response = await fetch('/.netlify/functions/create-auth-doc', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session })
          })
          const { codeChallenge, state} = await response.json()
          Spotify.auth(codeChallenge, state)
      } catch (error) {
        console.log(error)
      } 
  }

    const savePlaylist = async () => {
      if (!currentUser) {
        signIn()
      }
      const trackURIs = playlistTracks.map(track => track.uri)
      try {
        const response = await Spotify.savePlaylist(accessToken, currentUser, playlistName, trackURIs)
        dispatch(setPlaylistName(response.playlistName))
        dispatch(setPlaylistTracks(response.playlistTracks))
        dispatch(setSearchResults(response.searchResults))
      } catch(error) {
        console.log(error)
      }
    }

    return (
        <PlaylistContainer isMobile={isMobile} onKeyPress={(e) => e.key === 'Enter' && savePlaylist()}>
          <TitleContainer>
            <img src={editIcon} alt='edit playlist name' />
            <PlaylistNameInput width='unset' />
            <SaveToSpotifyButton onClick={savePlaylist} >SAVE TO SPOTIFY</SaveToSpotifyButton>
          </TitleContainer>
          <TrackList 
            tracks={playlistTracks}
            trackType={'playlist'}/>
        </PlaylistContainer>            
    )
}

export default Playlist