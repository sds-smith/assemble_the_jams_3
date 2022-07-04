require('dotenv').config()
const axios = require('axios').default
const qs = require('qs')
const { generateRandomString, base64urlencode, generateCodeChallenge, base64URL, pkce_challenge_from_verifier } = require('../../src/utils/random-generator')
const {createAuthDocumentFromSpotify, setAccessToken} = require('../../src/utils/firebase')

exports.handler = async (event) => {
    try {
        const {session, authCode} = JSON.parse(event.body)
        await createAuthDocumentFromSpotify(session, authCode)

        const authorization = base64urlencode(`${process.env.REACT_APP_CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        const headers = {
            'Authorization' : `Basic ${authorization}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        const data = `grant_type=authorization_code&code=${authCode}&redirect_uri=http://localhost:8888/&client_id=${process.env.REACT_APP_CLIENT_ID}&code_verifier=${process.env.AUTH_VERIFIER}`
        const response = await axios.post(`https://accounts.spotify.com/api/token`,
            data,
        {
            headers : headers,
        })
        const accessToken = response.data.access_token
        await setAccessToken(session, accessToken)
        return {
            statusCode: 200,
            body: JSON.stringify({ hasToken: true })
        }
    } catch(error) {
        console.log( error.response.data )
        return {
            status: 400,
            body: JSON.stringify({error})
        }
    }
}