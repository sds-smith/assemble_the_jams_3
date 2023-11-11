const API_URL = '/v1'

async function httpGetApi() {
    const response = await fetch(`${API_URL}`);
    return await response.json();
};

async function httpSearch(query) {
    const response = await fetch(`${API_URL}/spotify/search?query=${query}`);
    return await response.json()
};

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
    httpGetApi,
    httpSearch,
    httpSavePlaylist
};