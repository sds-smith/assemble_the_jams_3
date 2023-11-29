import {
    ApolloClient,
    ApolloLink,
    gql,
    InMemoryCache,
    createHttpLink,
    concat,
  } from "@apollo/client";

  export const apolloClient = new ApolloClient({
    uri: 'https://localhost:80/graphql',
    cache: new InMemoryCache()
  });

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
    console.log({isLike})
    const { data } = await apolloClient.mutate({
      mutation, 
      variables: {
        input: { trackId, isLike}
      }
    });
    console.log({data})
    return data.toggleResponse
  };

