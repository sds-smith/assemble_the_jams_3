const AUTH_URL = '/auth'

async function httpGetSession() {
    const response = await fetch(`${AUTH_URL}/get-session`);
    return await response.json();
};

async function httpGetClientToken() {
    try {
      const response = await fetch('/auth/spotify/get-client-token', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const tokenResponse = await response.json()
      return tokenResponse;
    } catch(error) {
      console.log('error with client log-in ', error)
    }
  }

async function httpLoginWithSpotify() {
    await fetch(`${AUTH_URL}/spotify/authenticate-user`)
}

async function httpSignOutUser() {
    const response = await fetch(`${AUTH_URL}/logout`);
    const jsonResponse = await response.json();
    return jsonResponse;
};

export {
    httpGetSession,
    httpGetClientToken,
    httpLoginWithSpotify,
    httpSignOutUser,
};