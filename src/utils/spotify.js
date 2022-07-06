
import { generateRandomString } from './random-state-generator';


const scope = encodeURIComponent('user-read-private user-read-email playlist-modify-public')
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