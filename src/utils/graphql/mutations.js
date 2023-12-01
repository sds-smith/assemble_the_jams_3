import { gql } from "@apollo/client";
import { apolloClient } from './apollo-client';
import { searchFragment } from "./fragments";
import { searchResultsQuery } from "./queries";

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
        message
        playlistName
        ...searchDetail
      }
    }
    ${searchFragment}
  `;
  const { data } = await apolloClient.mutate({
    mutation, 
    variables: {
      input: { playlistName, trackURIs }
    },
    update: (cache, { data }) => {
      const { savePlaylistResponse } = data;
      cache.writeQuery({
        query: searchResultsQuery,
        variables: { searchString: savePlaylistResponse.message },
        data: {
          search: savePlaylistResponse
        }
      })
    }
  });
  return data.savePlaylistResponse
};