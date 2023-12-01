import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

  export const apolloClient = new ApolloClient({
    uri: 'https://localhost:80/graphql',
    cache: new InMemoryCache()
  });