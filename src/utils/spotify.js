
import { generateRandomString } from './random-state-generator';

const scope = encodeURIComponent('user-read-private user-read-email playlist-modify-public streaming user-library-read user-library-modify')
const state = generateRandomString()
const SpotifyAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${scope}&state=${state}&code_challenge_method=S256&code_challenge=${process.env.REACT_APP_AUTH_CHALLENGE}&redirect_uri=http://localhost:8888/callback`


export const Spotify = {

    auth() {
        window.location.replace(SpotifyAuth)
    },

    async getUserProfile(authSession) {
        try {
            const response = await fetch('/.netlify/functions/get-user', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({authSession})
              })
              const user = await response.json()
              return user
        } catch(error) {
            window.alert({error})
        }
    },

    async getToken(authSession) {
      try {
          const response = await fetch('/.netlify/functions/token', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({authSession})
            })
            const {accessToken} = await response.json()
            return accessToken
      } catch(error) {
          window.alert({error})
      }
  },

    async search(authSession, searchTerm) {
        try {
            const response = await fetch('/.netlify/functions/search', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({authSession, searchTerm})
              })
              const {searchResults, recommendations} = await response.json()
              const recommendationsArray = recommendations.tracks.map(track => ({
                id : track.id,
                name : track.name,
                artist : track.artists[0].name,
                album : track.album.name,
                uri : track.uri
              }))
              const searchResultsArray = searchResults.tracks.items.map(track => ({
                id : track.id,
                name : track.name,
                artist : track.artists[0].name,
                album : track.album.name,
                uri : track.uri
              }))
              return {searchResultsArray, recommendationsArray}
        } catch(error) {
            window.alert({error})
        }
    },

    play(id, {
      spotify_uri,
      playerInstance:  {
          _options: {
            getOAuthToken
          }
      }
    }) {
      getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    },

    async getLikeStatus(authSession, trackId) {
        try {
            const response = await fetch('/.netlify/functions/get-user', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({authSession, trackId})
              })
              const status = await response.json()
              return status
        } catch(error) {
            window.alert({error})
        }
    },

    async savePlaylist(authSession, currentUser, playlistName, trackURIs) {
      try {
        const response = await fetch('/.netlify/functions/save-playlist', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({authSession, currentUser, playlistName, trackURIs})
        })
        const saveResponse = await response.json()
        return saveResponse
      } catch(error) {
            window.alert({error})
      }
    }
}