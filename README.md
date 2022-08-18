# Assemble the Jams 2.0

This project is a Progressive Web App created with React 18 and React Router 6, employing React functional components, hooks (including a custom hook), and Context API.  It utilizes css-in-js via Styled Components, and incorporates Redux, Firebase, and AWS Lambda functions.

## Project overview

Assemble the Jams 2.0 is a complete scratch rewrite of my Spotify playlist app ([read about version 1.0 here](https://github.com/sds-smith/assemble-the-jams/blob/main/README.md)).  After completing "The Complete React Developer 2022" from Zero to Mastery Academy, I wanted to implement the advanced React concepts that I had learned - as well as some of the other tools in the React ecosystem - and saw an opportunity to improve Assemble the Jams. The high-level improvements in version 2.0 are:

* Enterprise-level scalability through file structure, separation of concerns, and the use of reusable material components (ie buttons, logos, spinners, etc).
* Better human-readability through file structure, naming conventions (files, functions, variables), and the use of Styled Components.
* A more secure auth flow - creating a serverless backend with Redux-persist, Netlify (AWS Lambda) functions, and Firebase allowed for a proper auth code flow with PKCE that is kept entirely out of the browser.
* Elimination of 'prop-drilling' through the use of React Context API.

The app in its version 2.0 iteration can be viewed in [this video](https://youtu.be/LwBpalQgtro).

### TRY IT OUT

You can try out the app at https://assemblethejams.netlify.app

### Version 3.0 (coming soon)

Version 3.0 is already in planning, with UI/UX enhancements based on user feedback.  These enhancements will include:

* No-auth search functionality and no-auth track preview capability.
  * Based on user feedback, being faced with a sign-in page requesting personal info at the very beginning is a big turn-off, but this is unavoidable in the current configuration since both the Spotify search function and the playback sdk require authentication first. But...
  * Similar search results can be achieved using the Last.fm api without authentication
  * Spotify offers a preview url for most tracks which does not require authentication
* Automatic playlist population - all the user has to do is click 'save to Spotify' button.
  * Users did not find version 2.0 to be incredibly intuitive, and were confused about having to create their own playlist from recommendations. They just wanted to save the recommendations as a playlist. So, in version 3.0, that is how it will work.

