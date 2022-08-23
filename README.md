# Assemble the Jams 3.0

This project is a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction) created with React 18 and React Router 6, employing React functional components, hooks (including a custom hook), and Context API.  It utilizes css-in-js via Styled Components, and incorporates Redux, Firebase, and AWS Lambda functions.

The app allows any user (whether signed in or anonymous) to enter a search term (artist, album, or song) and receive back a custom generated playlist based on that search term. The user can further customize the playlist by giving it a name, removing unwanted tracks, and adding more tracks from a list of search term matches. They can also preview select tracks within the Playlist or Search Term Matches. Users who are signed in with their Spotify Premium account are also able to save the playlist to their Spotify profile, hear a preview of any track, and even add or remove a track from their liked songs from within the custom web player.

## Project overview

Assemble the Jams 3.0 builds on version 2.0 with several key improvements ([read about version 2.0 here](https://github.com/sds-smith/assemble_the_jams_2/blob/master/README.md)).  

  * **Removal of 'auth wall'** 
    * In previous versions, the user was faced with a sign-in page immediately upon opening the app, and was required to authenticate with their Spotify Premium account before using the app. 
    * Beginning in version 3.0, sign-in is optional.
  * **Offering select functionality to the user without the need for them to authenticate.**
    * `The user is now able to conduct a search and generate a playlist without the need to sign in.` On first render, the App initiates Client Credential oAuth flow and obtains an access token which is used for Spotify 'search' and 'recommendations' API calls. Beginning in version 3.0, the access token attained from user authentication is used exclusively for calls related to the user's Spotify account. 
    * `Previews of select tracks are now available even without a signed in user.` Beginning with version 1.0, the app instantiates a Spotify Connect player in the browser window as soon as a user access token is attained. Then, when the 'play' button is clicked within any track listing, the app sends the track information to the player inside of the play method. The limitation is that this player requires an authenticated user with a Spotify Premium account.  Happily, Spotify sometimes provides a preview url on the track object. This url points to a 30 second preview MP3, and does not require any authentication to use it. Beginning in version 3.0, there are two unique methods for previewing a track depending on auth state:
      * Pre-sign-in:   Clicking the 'play' button when there is no authenticated user but there is a preview url, creates an HTML Audio Element, passing in the preview url. If there is no preview url available, the user will receive a message to sign in for a preview of this track.
      * Post-sign-in:  When an authenticated user is signed in, the Spotify Web Player SDK is utilized so the user may preview any track that is rendered.
  * **Automatic playlist creation.**  In previous versions, the Playlist began empty and the user was required to build their own playlist by adding tracks from the two returned lists (Search Term Matches and Recommendations).  Beginning in version 3.0, the Recommendations component has been removed, and the Playlist is populated with the list returned from the Spotify 'recommendations' call. The user may choose to add/remove tracks, or they can save the Playlist as-is.

The app in its version 3.0 iteration can be viewed in [this video](https://youtu.be/vI-VfJhfXq4).

### TRY IT OUT

You can try out the app at https://assemblethejams.netlify.app


