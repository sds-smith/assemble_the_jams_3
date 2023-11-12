const fetch = require('node-fetch');

require('dotenv').config();

const SPOTIFY_API = 'https://api.spotify.com/v1/'

async function httpsSearch(req, res) {
    const { query } = req.query;
    const { client_token: {token} } = req.session;
    try {
        let endpoint = `${SPOTIFY_API}search?type=track&q=${query}&market=US`;
        const headers =  { Authorization : `Bearer ${token}` };
        const response = await fetch(endpoint, {headers : headers});
        const { tracks } = await response.json();
        const searchResultsArray = tracks.items.map(track => ({
          id : track.id,
          name : track.name,
          artist : track.artists[0].name,
          album : track.album.name,
          cover : track.album.images[0].url,
          uri : track.uri,
          preview : track.preview_url
        }))

        const seeds = tracks.items.slice(0, 5).map(track => track.id);

        const recommendationsResponse = await fetch(`${SPOTIFY_API}recommendations?seed_tracks=${seeds}`, { headers : headers });
        const recommendations = await recommendationsResponse.json();
        const recommendationsArray = recommendations.tracks.map(track => ({
          id : track.id,
          name : track.name,
          artist : track.artists[0].name,
          album : track.album.name,
          cover : track.album.images[0].url,
          uri : track.uri,
          preview : track.preview_url
        }));
        return res.status(200).json({searchResultsArray, recommendationsArray});
    } catch(error) {
        console.log('error with search', error);
        return res.status(400).json({searchResultsArray:[],recommendationsArray:[]});
      };
};

async function httpsSavePlaylist(req, res) {
  const { profile: { id }, accessToken } = req.user;
  const { playlistName, trackURIs } = req.body;

  try {
    const playlistResponse = await fetch(`${SPOTIFY_API}users/${id}/playlists`, {
      method: 'POST',
      headers: {
        Authorization : `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name : playlistName })
    });
    const response = await playlistResponse.json();
    const playlistID = await response.id;

    await fetch(`${SPOTIFY_API}users/${id}/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
        Authorization : `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris : trackURIs })
    });
    
    return res.status(200).json({
      message: 'Playlist has been saved to your Spotify account',
      playlistName: 'Name Your New Playlist',
      playlistTracks: [],
      searchResults: []
   });
  } catch(error) {
      console.log(error)
      return res.status(400).json({error});
  };
};

async function httpsGetLikeStatus(req, res) {
  try {
    const { trackId } = req.body;
    const { accessToken } = req.user;

    const headers = { Authorization : `Bearer ${accessToken}` };
    const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, { headers : headers });
    const status = (await response.json())[0];
    
    return res.status(200).json({status});
  } catch(error) {
      console.log({ error })
      return res.status(400).json({error});
  };
};

async function httpsToggleLike(req, res) {
  const { trackId, isLike } = req.body;
  const { accessToken } = req.user;
  const headers = { 
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${accessToken}`,
  }
  const method = isLike ? 'DELETE' : 'PUT';
  const message = isLike ? 'Removed from Liked Songs' : 'Added to Liked Songs';
  try {
      await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
      {
          headers : headers,
          method : method
      });
      return res.status(200).json({
        message,
        isLike : !isLike
    });
  } catch(error) {
      console.log(error)
      return res.status(400).json({error});
  };
};

module.exports = {
    httpsSearch,
    httpsSavePlaylist,
    httpsGetLikeStatus,
    httpsToggleLike
};