import axios from 'axios';

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
        window.alert('error with log-in, please contact app support.')
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
        return user
      } catch(error) {
        console.log('nope ', error)
        window.alert('error getting user profile, please contact app support.')
      }
    },

    async search(accessToken, searchTerm) {
        try {
            const headers =  { Authorization : `Bearer ${accessToken}` }
            const response = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}&market=US`,{headers : headers})
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
          body: JSON.stringify({ uris: [spotify_uri], position_ms: 30000 }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    },

    stopPlayback(id, access_token) {
      fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${id}`, {
        method: 'PUT',
        // body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      }).then(response => {console.log(response.ok)}
      ).catch(error => {console.log(error)});
    },

    async getLikeStatus(accessToken, trackId) {
        try {
            const headers = { Authorization : `Bearer ${accessToken}` }
            const response = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,{headers : headers})
            const status = response.data[0]
            return status
        } catch(error) {
            console.log('error getting like status', error)
            return false
        }
    },

    async savePlaylist(accessToken, currentUser, playlistName, trackURIs) {
      try {
          const userId = currentUser.id
          const headers =  { Authorization : `Bearer ${accessToken}` }

          const data = JSON.stringify({
              name : playlistName,
          })
          const playlistResponse = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,
              data,
          {
              headers : headers,
          })        
          const playlistID = playlistResponse.data.id

          const body = JSON.stringify({
              uris : trackURIs,
          })

          await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
              body,
          {
              headers : headers,
          })    
          return {
            message: 'Playlist has been saved to your Spotify account',
            playlistName: 'Name Your New Playlist',
            playlistTracks: [],
            searchResults: []
        }
      } catch(error) {
            console.log('error saving playlist', error)
      }
    },

    addLike(accessToken, trackId) {
      const headers = { 
          'Content-Type' : 'application/json',
          Authorization : `Bearer ${accessToken}`,
      }
      return fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
      {
          headers : headers,
          method : 'PUT',
      })
    },

    deleteLike(accessToken, trackId) {
      const headers = { 
          'Content-Type' : 'application/json',
          Authorization : `Bearer ${accessToken}`,
      }
      return fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
      {
          headers : headers,
          method : 'DELETE',
      })
    } 
}