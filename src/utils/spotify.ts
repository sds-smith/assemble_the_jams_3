import axios, { AxiosResponse } from 'axios';
import { SpotifyType, RecommendationsResponseType, SecondParamType, Play } from './spotify.types';

const scope = encodeURIComponent('user-read-private user-read-email playlist-modify-public streaming user-library-read user-library-modify')

export const Spotify: SpotifyType = {

    async getClientToken() {
      try {
        const response = await fetch('/.netlify/functions/get-client-access-token', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const {token, expires_in} = await response.json()
        return {token, expires_in}
      } catch(error) {
        console.log('error with client log-in ', error)
      }
    },

    auth(codeChallenge, state) {
      const SpotifyAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${scope}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
      window.location.replace(SpotifyAuth)
    },

    async refreshUserToken(refreshToken, authSession) {
      try {
        const response = await fetch('/.netlify/functions/refresh-user-access-token', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({refreshToken, authSession})
        })
        const {access_token, expires_in, expires_at, refresh_token} = await response.json()
        console.log({access_token, expires_in, expires_at, refresh_token})
        return {access_token, expires_in, expires_at, refresh_token}
      } catch(error) {
        console.log('error with token refresh ', error)
      }
    },

    async returnUserAccessToken(authSession) {
      try {
        const response = await fetch('/.netlify/functions/return-user-access-token', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ authSession })
        })
        const jsonResponse = await response.json()
        return jsonResponse.accessToken
      } catch(error) {
        console.log('nope ', error)
      }
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
        const image_url = images.length ? images[0].url : ''
        return {display_name, image_url, id}
      } catch(error) {
        console.log('error getting user profile ', error)
      }
    },

    async search(clientToken, query) {
        try {
            let endpoint = `https://api.spotify.com/v1/search?type=track&q=${query}&market=US`
            const headers =  { Authorization : `Bearer ${clientToken}` }
            const response: AxiosResponse = await axios.get(endpoint, {headers : headers})
            const searchResults: SpotifyApi.TrackSearchResponse = response.data
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
          
            const recommendationsResponse: AxiosResponse = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${seeds}`,{headers : headers})
            const recommendations: RecommendationsResponseType = recommendationsResponse.data
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
            return {searchResultsArray:[],recommendationsArray:[]}
          }
    },

    async transferPlayback(id, access_token) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player`, {
          method: 'PUT',
          body: JSON.stringify({ device_ids: [ id ], play: false }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
        console.log(`transfer success `, id)
      } catch(error) {
        console.log(error)
      }
    },

    playTrack(id, uri, currentPlayer) {
      const secondParam: SecondParamType = {
        spotify_uri: uri,
        playerInstance: currentPlayer
      }
      const play: Play = (id, {
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

    async stopPlayback(id, access_token) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [''] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      } catch(error) {
        console.log(error)
      }
    },

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
            return {
              message: 'Oops. Please try again.',
              playlistName: 'Name Your New Playlist',
              playlistTracks: [],
              searchResults: []
          }
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