const API_URL = '/v1';

async function httpSavePlaylist(playlistName, trackURIs) {
  const response = await fetch(`${API_URL}/spotify/save_playlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ playlistName, trackURIs })
  });
  return await response.json();
};

export {
  httpSavePlaylist,
};