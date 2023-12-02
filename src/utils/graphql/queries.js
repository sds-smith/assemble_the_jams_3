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

const likeStatusQuery = gql`
  query LikeStatus($trackId: ID) {
    likeStatus(trackId: $trackId)
  }
`

export async function likeStatus(trackId) {
  const { data } = await apolloClient.query({
    query: likeStatusQuery,
    variables: { trackId }
  });
  return data.likeStatus;
}