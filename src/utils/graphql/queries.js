import {
    ApolloClient,
    ApolloLink,
    gql,
    InMemoryCache,
    createHttpLink,
    concat,
  } from "@apollo/client";

  export const apolloClient = new ApolloClient();