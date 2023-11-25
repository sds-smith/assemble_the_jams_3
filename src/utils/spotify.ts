import { SpotifyType, SecondParamType, Play } from './types/spotify.types';

export const Spotify: SpotifyType = {

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

    // playTrack(id, uri, currentPlayer) {
    //   const secondParam: SecondParamType = {
    //     spotify_uri: uri,
    //     playerInstance: currentPlayer
    //   }
    //   const play: Play = (id, {
    //     spotify_uri,
    //     playerInstance: {
    //       _options: {
    //         getOAuthToken
    //       }
    //     }
    //   }) => {
    //     getOAuthToken(access_token => {
    //       fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ uris: [spotify_uri], position_ms: 30000 }),
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${access_token}`
    //         },
    //       });
    //     });
    //   }
    //   play(id, secondParam)
    // },

    async stopPlayback(id) {
      const access_token = ''; // Will need to access in backend
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
}