import { gql } from "@apollo/client";
import { apolloClient } from './apollo-client';
import { searchFragment } from "./fragments";

export const searchResultsQuery = gql`
  query Search($searchString: String) {
    search(searchString: $searchString) {
      ...searchDetail
    }
  }
  ${searchFragment}
`

export async function searchResultsArray(searchString) {
  const { data } = await apolloClient.query({ 
    query: searchResultsQuery,
    variables: { searchString }
  });
  return data.search;
};

export async function likeStatus(trackId) {
  const query = gql`
    query LikeStatus($trackId: ID) {
      likeStatus(trackId: $trackId)
    }
  `
  const { data } = await apolloClient.query({
    query,
    variables: { trackId }
  });
  return data.likeStatus;
}