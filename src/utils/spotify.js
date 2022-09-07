import axios from 'axios';
import '@types/spotify-web-playback-sdk'

const scope = encodeURIComponent('user-read-private user-read-email playlist-modify-public streaming user-library-read user-library-modify')

export const Spotify = {

    async getClientToken() {
      try {
        const response = await fetch('/.netlify/functions/get-client-access-token', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const {token, expiresIn} = await response.json()
        return {token, expiresIn}
      } catch(error) {
        console.log('nope ', error)
        window.alert('error with client log-in, please contact app support.')
      }
    },

    auth(codeChallenge, state) {
      const SpotifyAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${scope}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`

      window.location.replace(SpotifyAuth)
    },

    async getUserProfile(authSession) {
      try {
        const response = await fetch('/.netlify/functions/get-user', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ authSession })
        })
        const {user} = await response.json()
        const {display_name, images, id} = user
        return {display_name, images, id}
        
      } catch(error) {
        console.log('nope ', error)
        window.alert('error getting user profile, please contact app support.')
      }
    },

    async search(clientToken, query) {
        try {
            let endpoint = `https://api.spotify.com/v1/search?type=track&q=${query}&market=US`
            const headers =  { Authorization : `Bearer ${clientToken}` }
            const response = await axios.get(endpoint, {headers : headers})
            const searchResults = response.data
            const searchResultsArray = searchResults.tracks.items.map(track => ({
              id : track.id,
              name : track.name,
              artist : track.artists[0].name,
              album : track.album.name,
              cover : track.album.images[0].url,
              uri : track.uri,
              preview : track.preview_url
            }))
            const seeds = searchResults.tracks.items.slice(0, 5).map(track => track.id)
          
            const recommendationsResponse = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${seeds}`,{headers : headers})
            const recommendations = recommendationsResponse.data
            const recommendationsArray = recommendations.tracks.map(track => ({
              id : track.id,
              name : track.name,
              artist : track.artists[0].name,
              album : track.album.name,
              cover : track.album.images[0].url,
              uri : track.uri,
              preview : track.preview_url
            }))
            return {searchResultsArray, recommendationsArray}
        } catch(error) {
            console.log('error with search', error)
            window.alert('Error with Search. Please try again.')
        }
    },

    playTrack(id, uri) {
      const secondParam = {
        spotify_uri: uri,
        playerInstance: {
          _options: {
            getOAuthToken
          }
        }
      }
      const play = (id, {
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri], position_ms: 30000 }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      }
      play(id, secondParam)
    },

    // play(id, {
      // spotify_uri,
      // playerInstance:  {
          // _options: {
            // getOAuthToken
          // }
      // }
    // }) {
      // getOAuthToken(access_token => {
        // fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          // method: 'PUT',
          // body: JSON.stringify({ uris: [spotify_uri], position_ms: 30000 }),
          // headers: {
            // 'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${access_token}`
          // },
        // });
      // });
    // },

    async getLikeStatus(authSession, trackId) {
      try {
        const response = await fetch('/.netlify/functions/get-like-status', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ authSession, trackId })
        })
        const {status} = await response.json()
        return status
      } catch(error) {
          console.log('error getting like status', error)
          return false
      }
    },

    async savePlaylist(authSession, currentUser, playlistName, trackURIs) {
      try {
        const response = await fetch('/.netlify/functions/save-playlist', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ authSession, currentUser, playlistName, trackURIs })
        })
        const jsonResponse = await response.json()
        return jsonResponse 
      } catch(error) {
            console.log('error saving playlist', error)
            window.alert('Because this app is in Development Mode, Spotify requires you to be added as an approved user.  Please contact app support to be added.  Sorry for the inconvenience as we await Spotify approval for full app status.')
      }
    },

    async toggleLike(authSession, nowPlaying) {
      try {
        const {isLike, track} = nowPlaying
        const trackId = track.id
        const response = await fetch('/.netlify/functions/toggle-like', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ authSession, trackId, isLike })
        })
        const jsonResponse = await response.json()
        return jsonResponse 
      } catch(error) {
            console.log('error editing like', error)
      }
    }
}