const API_URL = '/v1'

async function httpGetApi() {
    const response = await fetch(`${API_URL}`);
    return await response.json();
};

export {
    httpGetApi,
};