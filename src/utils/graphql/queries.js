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
  const response = await apolloClient.query({ 
    query,
    variables: { searchString }
  })
  console.log(response)
  }