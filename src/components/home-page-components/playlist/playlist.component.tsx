import { useContext, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import PlaylistNameInput from '../playlist-name-input/playlist-name-input.component'
import TrackList from "../../reusable-components/track-list/track-list.component"
import ActionMessage from "../../reusable-components/action-message/action-message.component"

import editIcon from '../../../assets/icons/edit_white24.png'

import { selectAuthSession } from "../../../store/auth/auth.selector"
import { selectPlaylistTracks, selectPlaylistName } from '../../../store/track/track.selector'
import { setPlaylistTracks, setPlaylistName, setSearchResults } from '../../../store/track/track.action'
import { selectCurrentUser, selectCurrentUserExists } from '../../../store/user/user.selector'
import { ResponsiveContext } from "../../../contexts/responsive.context"
import { Spotify } from "../../../utils/spotify"
import { PlaylistContainer, TitleContainer,  SaveToSpotifyButton } from './playlist.styles'

const Playlist = () => {
    const [savedMessage, setSavedMessage] = useState('')

    const authSession = useSelector(selectAuthSession)
    const currentUser = useSelector(selectCurrentUser)
    const currentUserExists = useSelector(selectCurrentUserExists)
    const dispatch = useDispatch()

    const playlistTracks = useSelector(selectPlaylistTracks)
    const playlistName = useSelector(selectPlaylistName)
    const { isMobile } = useContext(ResponsiveContext) 

    const savePlaylist = async () => {
      if (!currentUserExists) {
        setSavedMessage("Please sign in with your Spotify Premium account")
        setTimeout(() => setSavedMessage(''), 3000);      
      } else {
        const trackURIs: string[] = playlistTracks.map(track => track.uri)
        try {
          const response = await Spotify.savePlaylist(authSession, currentUser, playlistName, trackURIs)
          if (response.message === 'Playlist has been saved to your Spotify account') {
            dispatch(setPlaylistName(response.playlistName))
            dispatch(setPlaylistTracks(response.playlistTracks))
            dispatch(setSearchResults(response.searchResults))
          }
          setSavedMessage(response.message)
          setTimeout(() => setSavedMessage(''), 3000);
        } catch(error) {
          console.log(error)
        }
      }
    }

    return (
        <PlaylistContainer isMobile={isMobile} onKeyPress={(e) => e.key === 'Enter' && savePlaylist()}>
          <TitleContainer isMobile={isMobile} >
            { !isMobile && <img src={editIcon} alt='edit playlist name' />}
            <PlaylistNameInput width={isMobile ? '100%' : 'unset'} />
            <SaveToSpotifyButton onClick={savePlaylist} >SAVE TO SPOTIFY</SaveToSpotifyButton>
          </TitleContainer>
          <ActionMessage position='absolute' right='50px' width='10rem' >{savedMessage}</ActionMessage>
          <TrackList 
            trackType={'playlist'}
          />
        </PlaylistContainer>            
    )
}

export default Playlist