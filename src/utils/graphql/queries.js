import { gql } from "@apollo/client";
import { apolloClient } from './apollo-client';

export async function searchResults(searchString) {
  const query = gql`
    query Search($searchString: String) {
      search(searchString: $searchString) {
        searchResultsArray {
            album
            artist
            name
            cover
            id
            preview
            uri
        }
        recommendationsArray {
            album
            artist
            name
            cover
            id
            preview
            uri
        }
      }
    }
  `
  const { data } = await apolloClient.query({ 
    query,
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