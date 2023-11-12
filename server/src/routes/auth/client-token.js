const fetch = require('node-fetch');

require('dotenv').config();

function base64urlencode(a) {
    return new Buffer.from(a).toString('base64');
};

async function getClientToken(req, res) {
    try {
        const authorization = base64urlencode(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`);
        const headers = {
            'Authorization' : `Basic ${authorization}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        };
        const body = 'grant_type=client_credentials';
        const response = await fetch(`https://accounts.spotify.com/api/token`,
        {
            method: 'POST',
            headers,
            body,
            json: true
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            const token = await jsonResponse.access_token;
            const expires_in = await jsonResponse.expires_in;
            req.session.client_token = { token, expires_in };
            return res.status(200).json({hasClientToken: true});
        } else {
            console.log(response.statusText);
            return res.status(400).json({error: response.statusText});
        };
    } catch(error) {
        console.log(error);
        return res.status(400).json({error, hasClientToken: false});
    };
};

module.exports = {
    getClientToken
};