import { gql } from "@apollo/client";
import { searchFragment } from "./fragments";

export const searchResultsQuery = gql`
  query Search($searchString: String) {
    search(searchString: $searchString) {
      ...searchDetail
    }
  }
  ${searchFragment}
`;

export const likeStatusQuery = gql`
  query LikeStatus($trackId: ID) {
    likeStatus(trackId: $trackId)
  }
`;