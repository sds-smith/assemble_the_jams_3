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

async function httpGetLikeStatus(trackId) {
    const response = await fetch(`${API_URL}/spotify/get_like_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackId })
      });
    return await response.json();
};

async function httpToggleLike(nowPlaying) {
    const trackId = nowPlaying.track.id;
    const { isLike } = nowPlaying;
    const response = await fetch(`${API_URL}/spotify/toggle_like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackId, isLike })
      });
    return await response.json();
};

export {
    httpGetApi,
    httpSearch,
    httpSavePlaylist,
    httpToggleLike,
    httpGetLikeStatus
};