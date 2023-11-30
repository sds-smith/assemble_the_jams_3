import { useContext, useState } from "react";

import PlaylistNameInput from '../playlist-name-input/playlist-name-input.component';
import TrackList from "../../reusable-components/track-list/track-list.component";
import ActionMessage from "../../reusable-components/action-message/action-message.component";

import editIcon from '../../../assets/icons/edit_white24.png';

import { ResponsiveContext } from "../../../contexts/responsive.context";
import { AuthContext } from "../../../contexts/auth.context";
import { TrackContext } from "../../../contexts/track.context";
import { savePlaylist as gqlSavePlaylist } from "../../../utils/graphql/queries";
import { httpSavePlaylist } from "../../../utils/http.requests";
import { TrackType } from "../../../utils/types/track.types";
import { PlaylistContainer, TitleContainer,  SaveToSpotifyButton } from './playlist.styles';

const Playlist = () => {
  const [savedMessage, setSavedMessage] = useState('');

  const { isMobile } = useContext(ResponsiveContext);
  const { currentUserExists } = useContext(AuthContext);
  const { playlistTracks, playlistName, setPlaylistName, setPlaylistTracks, setSearchResults } = useContext(TrackContext);

  const savePlaylist = async () => {
    if (!currentUserExists) {
      setSavedMessage("Please sign in with your Spotify Premium account")
      setTimeout(() => setSavedMessage(''), 3000);      
    } else {
      const trackURIs: string[] = playlistTracks.map((track: TrackType) => track.uri);
      try {
        const response = await gqlSavePlaylist({playlistName, trackURIs});
        if (response.message === 'Playlist has been saved to your Spotify account') {
          setPlaylistName(response.playlistName);
          setPlaylistTracks(response.playlistTracks);
          setSearchResults(response.searchResults);
        }
        setSavedMessage(response.message);
        setTimeout(() => setSavedMessage(''), 3000);
      } catch(error) {
        console.log(JSON.stringify(error, null, 2));
      };
    };
  };

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
  );
};

export default Playlist;