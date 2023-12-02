import { gql } from "@apollo/client";
import { apolloClient } from './apollo-client';
import { searchFragment } from "./fragments";
import { searchResultsQuery } from "./queries";


const toggleLikeMutation = gql`
  mutation ToggleLike($input: ToggleLikeInput!) {
    toggleResponse: toggleLike(input: $input) {
      status
      message
      is_like
    }
  }
`;

export async function toggleLike({ trackId, isLike }) {
  const { data } = await apolloClient.mutate({
    mutation: toggleLikeMutation, 
    variables: {
      input: { trackId, isLike}
    }
  });
  return data.toggleResponse;
};

const savePlaylistMutation = gql`
  mutation savePlaylist($input: SavePlaylistInput!) {
    savePlaylistResponse: savePlaylist(input: $input) {
      message
      playlistName
      ...searchDetail
    }
  }
  ${searchFragment}
`;

export async function savePlaylist({ playlistName, trackURIs }) {
  const { data } = await apolloClient.mutate({
    mutation: savePlaylistMutation, 
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