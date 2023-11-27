import fetch from 'node-fetch';

import dotenv from 'dotenv';
dotenv.config();

const SPOTIFY_API = 'https://api.spotify.com/v1/'

async function search(reqObj) {
    const { query, token } = reqObj;
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
        return {
          status: 200,
          message: 'search ok',
          searchResultsArray,
          recommendationsArray
        };
    } catch(error) {
        console.log('error with search', error);
        return {
          status: 400,
          message: error.message,
          searchResultsArray: [],
          recommendationsArray: []
        };
      };
};

async function savePlaylist(reqObj) {
  const { id, accessToken, playlistName, trackURIs } = reqObj;

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
    
    return {
      status: 200,
      message: 'Playlist has been saved to your Spotify account',
      playlist_name: 'Name Your New Playlist',
      playlistTracks: [],
      searchResults: []
   };
  } catch(error) {
      console.log(error)
      return {
        status: 400,
        message: error.message
      };
  };
};

async function getLikeStatus(reqObj) {
  const { trackId, accessToken } = reqObj;
  try {

    const headers = { Authorization : `Bearer ${accessToken}` };
    const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, { headers : headers });
    const status = (await response.json())[0];
    
    return {
      status: 200,
      message: 'like status retrieved',
      likeStatus: status
    };
  } catch(error) {
      console.log({ error })
      return {
        status: 400,
        message: error.message
      };
  };
};

async function toggleLike(reqObj) {
  const { trackId, isLike, accessToken } = reqObj;

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
      return {
        status: 200,
        message,
        is_like: !isLike
      };
  } catch(error) {
      console.log(error)
      return {
        status: 400,
        message: error.message
      };
  };
};

export {
  search,
  savePlaylist,
  getLikeStatus,
  toggleLike
};