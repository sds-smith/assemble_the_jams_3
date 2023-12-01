import { gql } from "@apollo/client";
import { apolloClient } from './apollo-client';

export async function toggleLike({ trackId, isLike }) {
    const mutation = gql`
      mutation ToggleLike($input: ToggleLikeInput!) {
        toggleResponse: toggleLike(input: $input) {
          status
          message
          is_like
        }
      }
    `;
    const { data } = await apolloClient.mutate({
      mutation, 
      variables: {
        input: { trackId, isLike}
      }
    });
    return data.toggleResponse
};

export async function savePlaylist({ playlistName, trackURIs }) {
  const mutation = gql`
    mutation savePlaylist($input: SavePlaylistInput!) {
      savePlaylistResponse: savePlaylist(input: $input) {
        status
        message
        playlistName
        playlistTracks {album}
        searchResults {album}
      }
    }
  `;
  const { data } = await apolloClient.mutate({
    mutation, 
    variables: {
      input: { playlistName, trackURIs }
    }
  });
  return data.savePlaylistResponse
};