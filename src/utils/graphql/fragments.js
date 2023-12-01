import { gql } from "@apollo/client";

export const trackFragment = gql`
  fragment TrackDetail on Track {
    album
    artist
    name
    cover
    id
    preview
    uri
  }
`

export const searchFragment = gql`
  fragment searchDetail on SearchResults {
    searchResultsArray {
      ...TrackDetail
    }
    recommendationsArray {
       ...TrackDetail
    }
  }
  ${trackFragment}
`