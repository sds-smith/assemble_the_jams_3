const AUTH_URL = '/auth'

async function httpGetSession() {
    const response = await fetch(`${AUTH_URL}/get-session`);
    return await response.json();
};

async function httpLoginWithGoogle() {
    await fetch(`${AUTH_URL}/google`)
}

async function httpLoginWithLinkedin() {
    await fetch(`${AUTH_URL}/linkedin`)
};

async function httpSignOutUser() {
    const response = await fetch(`${AUTH_URL}/logout`);
    const jsonResponse = await response.json();
    return jsonResponse;
};

export {
    httpGetSession,
    httpLoginWithGoogle,
    httpLoginWithLinkedin,
    httpSignOutUser,
};