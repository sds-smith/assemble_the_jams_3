const fetch = require('node-fetch');

require('dotenv').config();

const SPOTIFY_API = 'https://api.spotify.com/v1/'

async function httpsSearch(req, res) {
    const { query } = req.query;
    const { client_token: {token} } = req.session;
    try {
        let endpoint = `${SPOTIFY_API}search?type=track&q=${query}&market=US`
        const headers =  { Authorization : `Bearer ${token}` }
        const response = await fetch(endpoint, {headers : headers})
        const {tracks} = await response.json();
        const searchResultsArray = tracks.items.map(track => ({
          id : track.id,
          name : track.name,
          artist : track.artists[0].name,
          album : track.album.name,
          cover : track.album.images[0].url,
          uri : track.uri,
          preview : track.preview_url
        }))

        const seeds = tracks.items.slice(0, 5).map(track => track.id)

        const recommendationsResponse = await fetch(`${SPOTIFY_API}recommendations?seed_tracks=${seeds}`,{headers : headers})
        const recommendations = await recommendationsResponse.json();
        const recommendationsArray = recommendations.tracks.map(track => ({
          id : track.id,
          name : track.name,
          artist : track.artists[0].name,
          album : track.album.name,
          cover : track.album.images[0].url,
          uri : track.uri,
          preview : track.preview_url
        }))
        return res.status(200).json({searchResultsArray, recommendationsArray});
    } catch(error) {
        console.log('error with search', error)
        return res.status(400).json({searchResultsArray:[],recommendationsArray:[]});
      }
};

async function httpsSavePlaylist(req, res) {
  const { user: {id} } = req;
  const { playlistName, trackURIs } = JSON.parse(req.body);
  const accessToken = '' ///////////// to do ///////////////////

  console.log(`[httpsSavePlaylist] id: ${id}, playlistName: ${playlistName}, trackURIs ${trackURIs}`)

  try {
    const userId = id;
    const headers =  { Authorization : `Bearer ${accessToken}` }

    const data = JSON.stringify({
        name : playlistName,
    })
    const playlistResponse = await fetch(`${SPOTIFY_API}users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization : `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name : playlistName })
    });
    const playlistID = playlistResponse.data.id

    await fetch(`${SPOTIFY_API}users/${userId}/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
        Authorization : `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris : trackURIs })
    })    
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Playlist has been saved to your Spotify account',
            playlistName: 'Name Your New Playlist',
            playlistTracks: [],
            searchResults: []
        })
    }
} catch(error) {
    console.log(error.response.data )
    return {
        statusCode: 400,
        body: JSON.stringify({error})
    }
}
};

module.exports = {
    httpsSearch,
    httpsSavePlaylist
};