# Assemble the Jams 3.0

This Playlist Generator [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction) is built with React 18 and React Router 6, employing React functional components, hooks (including three custom hooks), and Context API.  It utilizes css-in-js via Styled Components, and incorporates Redux, Firebase, and AWS Lambda functions.

Working with the Spotify API, the app allows any user (whether signed in or anonymous) to enter a search term (artist, album, or song) and receive back a custom generated playlist based on that search term. 

Track controls within each track allow the user to preview select tracks (those with a preview url) within the Playlist or Search Term Matches and customize the playlist by adding and removing tracks. 

Users who are signed in with their Spotify Premium account are additionally able to save the playlist to their Spotify profile, hear a preview of any track (not just those with a preview url), and even add or remove a track from their liked songs from within the custom web player.

It is fully scalable, fully secure, and fully type-protected.

## Use Case
Spotify provides a robust search and recommendations feature which can be experienced on their own website, or on their desktop or mobile apps. When a user executes a search on Spotify, they are provided with matches in seven categories: All, Artists, Playlists, Albums, Songs, Podcasts & Shows, and Profiles. Each of these categories is itself a deep rabbit-hole, some containing even more sub-categories. An absolute wealth of information. But what if a user prefers not to sort through all of this? What if they'd like to just be served up a freshly curated playlist of tracks by many different artists, all based on a search term (artist, album, or song) of their choosing? Enter Assemble the Jams.


### TRY IT OUT

A demo video of the app can be viewed by clicking on the below thumbnail.

[![video link](http://img.youtube.com/vi/vI-VfJhfXq4/0.jpg)](http://www.youtube.com/watch?v=vI-VfJhfXq4)

Or, you can try out the live app for yourself at https://assemblethejams.netlify.app (feel free to add it to your mobile home screen - or your desktop - for the full PWA experience).

## Project overview

Assemble the Jams 3.0 builds on its predecessor with several key improvements ([read about version 2.0 here](https://github.com/sds-smith/assemble_the_jams_2/blob/master/README.md)).  

  * **Removal of 'auth wall'** 
    * In previous versions, the user was faced with a sign-in page immediately upon opening the app, and was required to authenticate with their Spotify Premium account before using any of its features. Additionally, because the app was registered in Development Mode prior to v3.0, each user was required to be explicitly added as an authorized user on the Spotify Developer portal in order to use the app.
    * Beginning in version 3.0, sign-in is optional, and users do not need to be explicitly added on the Developer portal.

  * **Offering select functionality to the user without the need for them to authenticate.**

    * `The user is now able to conduct a search and generate a playlist without the need to sign in.` On first render, the App initiates Client Credential oAuth flow and obtains an access token which is used for Spotify 'search' and 'recommendations' API calls. Beginning in version 3.0, the access token attained from user authentication is used exclusively for calls related to the user's Spotify account. 

    * `Previews of select tracks are now available even without a signed in user.` Beginning as far back as version 1.0, the app loads the web playback SDK and instantiates a player in the browser window as soon as a user access token is attained. Then, when the 'play' button is clicked within any track listing, the app sends the track information to the player inside of the play method. The limitation is that this player requires an authenticated user with a Spotify Premium account.  Happily, Spotify sometimes provides a preview url on the track object. This url points to a 30 second preview MP3, and does not require any authentication to use it. Beginning in version 3.0, there are two unique methods for previewing a track depending on auth state:
      * Pre-sign-in:   Clicking the 'play' button when there is no authenticated user but there is a preview url, creates an HTML Audio Element, passing in the preview url. If there is no preview url available, the user will receive an alert with the message "Please sign in with Spotify to preview this track."
      * Post-sign-in:  When an authenticated user is signed in, the Spotify Web Playback SDK is utilized as in previous versions, so the user may preview any track that is rendered.
      
  * **Automatic playlist creation.**  In previous versions, the Playlist began empty and the user was required to build their own playlist by adding tracks from the two returned lists (Search Term Matches and Recommendations).  Beginning in version 3.0, the Recommendations component has been removed, and the Playlist is populated with the list returned from the Spotify 'recommendations' endpoint. The user may choose to add/remove tracks, or they can save the Playlist as-is.

## Auth Flow
  Authentication and Authorization with Spotify are attained securely in a serverless backend using AWS Lambda functions, Firebase firestore, and Redux-persist. Two types of authentication are implemented:
  
  ### Client Credentials Flow
  When the app is initially loaded, it obtains an access token using the client credentials flow. This token is used for all search and recommendations functionality, so the user is able to receive search results without authenticating with their Spotify Premium account.
  
  ### Authorization Code Flow
  When the user clicks the 'Sign In' button, user authentication is initiated with Spotify using Authorization Code flow, returning the user access_token, refresh_token, and expires_in values. The app converts expires_in to expires_at and all values are stored in firestore. Each time the app first mounts (for instance, if the user closes their browser window without signing out and returns later), the app checks for an expired token. If the token is expired, the app will either refresh the access token (if a refresh token is available) or initiate the signout process. If the token is not expired, the app sets a setTimeout on the window object, at the end of which it either refreshes or signs out.
  
## Interaction with Spotify REST API
Interaction with the Spotify API is attained through requests to `'https://api.spotify.com/v1'`. Several endpoints are accessed at different points of the user flow.

  * **SEARCH:** `'/search?type=track&q=[THE_SEARCH_TERM_ENTERED_BY_USER]'` - Returns an array of up to 20 tracks that match the user-entered keyword string. Seven properties are destructured off each track object for use in the app: track_id, name, artist, album, cover, uri, and preview_url. Several of these properties are then mapped to the track list that is rendered in the 'Search Term Matches' component.

  * **RECOMMENDATIONS:** `'/recommendations?seed_tracks=[SEEDS_FROM_SEARCH_RESULTS]'` - Recommendations are generated based on the metadata for a given seed entity and matched against similar artists and tracks. Up to five seed entities can be passed as parameters to the endpoint. In this case, the first five tracks returned from the /search request are passed in as the seed entities. Spotify scores each track on as many as 42 attributes (such as tempo, danceability, acousticness, etc). Recommendations are generated based on these attributes. As with the search results, up to 20 recommendations tracks are returned; these tracks are mapped into the 'Playlist' component.

  * **USER:** `'/me'` - Once an access token has been attained through user authentication with Spotify, a request is sent to the '/me' endpoint; then display_name, image_url, and id are destructured off the returned user object. The display_name value is interpolated into the app's url to create a dynamic path where Router renders the signed-in side of the app, and the user's display name and profile picture--image_url--(if available) are displayed in place of the 'unknown user' heading to indicate a signed-in user.

  * **PLAY:** `'/me/player/play?device_id=[UNIQUE_DEVICE_ID]'` - Once the user is authenticated with their Spotify Premium account, the web playback SDK loads, and instantiates a [Spotify Connect](https://developer.spotify.com/documentation/web-playback-sdk/) player in the window. Selecting the play button inside any track sends that track's information to the player and initiates playback. This player is capable of playing entire tracks, albums, playlists or any other context, but I have it set to play just a 30 second 'preview' to remain consistent with pre-sign-in user experience.

  * **LIKE-STATUS:** `'/me/tracks/contains?ids=[TRACK_ID]'` - This returns a boolean value indicating whether the selected track exists in the user's list of 'liked' songs in Spotify. It is called when a track is selected to be played and the returned value is used to set/ operate the like toggle button within the 'Now Playing Card'.

  * **TOGGLE-LIKE:** `'/me/tracks?ids=[TRACK_ID]'` - Selecting the like toggle button (heart) sends either a 'put' or 'delete' request to this endpoint to either add or delete the currently playing track to the user's liked songs list. The like toggle button will display as either solid or outline depending on whether the song is currently included in the user's liked songs list.

  * **SAVE-PLAYLIST:** This is a two-step process: 
                    `'/users/[USER-ID]/playlists'` - First, a 'post' request is sent to this endpoint, creating an empty playlist with the user's entered playlist name. A playlist id is returned from Spotify.
                    `'/users/[USER-ID]/playlists/[PLAYLIST-ID]/tracks'` - Then, a 'post' request is sent to this endpoint with a track_uri array in the body of the request, to add the track_uri's to the newly created playlist.

## Spotify Approval
In order to retrieve data from the Spotify API, this and all apps must be registered on the Spotify Developer portal. At that time, the app receives its own unique Client credentials and is registered in **Development Mode**.

In Development Mode, up to 25 Spotify users can install and use the app, but they must be explicitly added on the Developer portal before they can authenticate and actually use the app.

**Assemble the Jams has been approved by Spotify as a full production app is no longer in Development Mode.**

To attain this approval, this app underwent a rigorous review process by Spotify to ensure that it complied with all requirements in the [Spotify Developer Policy](https://developer.spotify.com/policy/) and [Spotify Design Guidelines](https://developer.spotify.com/documentation/general/design-and-branding/). As a full production app, Assemble the Jams has been granted access to an increased API request quota and an unlimited number of Spotify users can install and use it without being explicitly added to a list of users in Developer portal.

## DefinitelyTyped - TypeScript node package for Spotify API
The node package [@types/spotify-api](https://www.npmjs.com/package/@types/spotify-api) is a package containing type definitions for the Spotify Web API, including complex types for data objects, requests, and responses relating to the Spotify API.

I've had the opportunity to contribute two pieces of code to this package:
  * **RecommendationsResponse Object** - I was able to submit an update to this type after discovering that it contained an incorrectly-typed Track object (TrackObjectSimplified, which does not contain and album property). But while TrackObjectFull (the only other Track type) does contain an album property, it yields album_type in all lower-case. This exposes a small bug in the Spotify API, as the lower-case is in conflict with the all-caps album_type in the recommendations response Track
  * **RecommendationTrackObject** - This is a new Track Object type added to the package, specific to the recommendations response returned from a recommendations with seeds request. This track object is identical to the TrackObjectFull except that the album_type values are returned in all caps.