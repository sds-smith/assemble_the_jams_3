import { useContext, useState } from "react";
import PlaylistNameInput from '../playlist-name-input/playlist-name-input.component';
import TrackList from "../../reusable-components/track-list/track-list.component";
import ActionMessage from "../../reusable-components/action-message/action-message.component";
import editIcon from '../../../assets/icons/edit_white24.png';
import { ResponsiveContext } from "../../../contexts/responsive.context";
import { AuthContext } from "../../../contexts/auth.context";
import { TrackContext } from "../../../contexts/track.context";
import { usePlaylist } from "../../../utils/custom-hooks/apollo-hooks";
import { TrackType } from "../../../utils/types/track.types";
import { PlaylistContainer, TitleContainer,  SaveToSpotifyButton } from './playlist.styles';

const Playlist = () => {
  const [savedMessage, setSavedMessage] = useState('');

  const { isMobile } = useContext(ResponsiveContext);
  const { currentUserExists } = useContext(AuthContext);
  const { recommendationsArray, playlistName, setPlaylistName, setRecommendationsArray, setSearchResultsArray } = useContext(TrackContext);

  const { savePlaylist, saveLoading } = usePlaylist(); 

  const displaySaveMessage = (saveMsg: string) => {
    setSavedMessage(saveMsg)
    setTimeout(() => setSavedMessage(''), 3000); 
  }
  const handleSavePlaylist = async () => {
    if (!currentUserExists) {
      displaySaveMessage("Please sign in with your Spotify Premium account");   
    } else if (!saveLoading) {
      const trackURIs: string[] = recommendationsArray.map((track: TrackType) => track.uri);
      try {
        const response = await savePlaylist({playlistName, trackURIs});
        if (response.message === `Playlist "${playlistName}" has been saved to your Spotify account`) {
          setPlaylistName(response.playlistName);
          setRecommendationsArray(response.recommendationsArray);
          setSearchResultsArray(response.searchResultsArray);
        }
        displaySaveMessage(response.message);
      } catch(error) {
        console.log(JSON.stringify(error, null, 2));
      };
    };
  };

  return (
    <PlaylistContainer isMobile={isMobile} onKeyPress={(e) => e.key === 'Enter' && handleSavePlaylist()}>
      <TitleContainer isMobile={isMobile} >
        { !isMobile && <img src={editIcon} alt='edit playlist name' />}
        <PlaylistNameInput width={isMobile ? '100%' : 'unset'} />
        <SaveToSpotifyButton onClick={handleSavePlaylist} disabled={saveLoading} >SAVE TO SPOTIFY</SaveToSpotifyButton>
      </TitleContainer>
      <ActionMessage position='absolute' right='50px' width='10rem' >{savedMessage}</ActionMessage>
      <TrackList 
        trackType={'playlist'}
      />
    </PlaylistContainer>            
  );
};

export default Playlist;