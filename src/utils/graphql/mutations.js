import { gql } from "@apollo/client";
import { searchFragment } from "./fragments";

export const toggleLikeMutation = gql`
  mutation ToggleLike($input: ToggleLikeInput!) {
    toggleResponse: toggleLike(input: $input) {
      status
      message
      is_like
    }
  }
`;

export const savePlaylistMutation = gql`
  mutation savePlaylist($input: SavePlaylistInput!) {
    savePlaylistResponse: savePlaylist(input: $input) {
      message
      playlistName
      ...searchDetail
    }
  }
  ${searchFragment}
`;