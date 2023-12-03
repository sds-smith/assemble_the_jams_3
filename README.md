# Assemble the Jams 3.2

A Playlist Generator [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction) leveraging the Spotify API.

This project serves as a personal playground where I can try out new things as I continue to explore and learn new technologies and skills.
It has evolved through numerous iterations since its original development in February, 2022 and holds a special place in my heart as the Codecademy project from which it grew was my first exposure to React, OAuth2.0, and fetch requests.

The main branch is up to date with branch v3.2_graphql.

## Primary Tech Stack

- Express 4.18.2
- React.js 18.2.8
- GraphQL 16.8.1
- Apollo Server 4.9.5
- Apollo Client 3.8.7

### Additional Technologies used:

- TypeScript for client-side code
- @types/spotify-api
- Styled Components
- Cookie-sessions
- Passport
- Passport-spotify

## Use Case

Spotify provides a robust search and recommendations feature which can be experienced on their own website, or on their desktop or mobile apps. When a user executes a search on Spotify, they are provided with matches in seven categories: All, Artists, Playlists, Albums, Songs, Podcasts & Shows, and Profiles. Each of these categories is itself a deep rabbit-hole, some containing even more sub-categories. An absolute wealth of information. But what if a user prefers not to sort through all of this? What if they'd like to just be served up a freshly curated playlist of tracks by many different artists, all based on a search term (artist, album, or song) of their choosing? Enter Assemble the Jams.

### TRY IT OUT

A demo video of the app can be viewed by clicking on the below thumbnail.

[![video link](http://img.youtube.com/vi/MWqiaZKtZzg/0.jpg)](http://www.youtube.com/watch?v=MWqiaZKtZzg)

## Project overview

## Spotify Approval

In order to retrieve data from the Spotify API, this and all apps must be registered on the Spotify Developer portal. At that time, the app receives its own unique Client credentials and is registered in **Development Mode**.

In Development Mode, up to 25 Spotify users can install and use the app, but they must be explicitly added on the Developer portal before they can authenticate and actually use the app.

**Assemble the Jams has been approved by Spotify as a full production app is no longer in Development Mode.**

To attain this approval, this app underwent a rigorous review process by Spotify to ensure that it complied with all requirements in the [Spotify Developer Policy](https://developer.spotify.com/policy/) and [Spotify Design Guidelines](https://developer.spotify.com/documentation/general/design-and-branding/). As a full production app, Assemble the Jams has been granted access to an increased API request quota and an unlimited number of Spotify users can install and use it without being explicitly added to a list of users in Developer portal.

## DefinitelyTyped - TypeScript node package for Spotify API

The node package [@types/spotify-api](https://www.npmjs.com/package/@types/spotify-api) is a package containing type definitions for the Spotify Web API, including complex types for data objects, requests, and responses relating to the Spotify API.

I've had the opportunity to contribute three small pieces of code to this open-source package:

- **RecommendationsObject** - I was able to submit an update to this type after discovering that it contained an incorrectly-typed Track object (TrackObjectSimplified, which does not contain and album property). But while TrackObjectFull (previously the only available alternative) does contain an album property, that album Object yields album_type in all lower-case. This exposes a small bug in the Spotify API, as the all-caps album_type in the recommendations response Track is inconsistent with all other endpoint responses.
- **RecommendationTrackObject** - This is a new Track Object type added to the package, specific to the recommendations response returned from a recommendations with seeds request. This track object is identical to the TrackObjectFull except that it contains a newly-created RecommendationAlbumObject.
- **RecommendationAlbumObject** - Similarly, this extends the AlbumObjectSimplified, but yields album_type in all caps instead of lowercase.
