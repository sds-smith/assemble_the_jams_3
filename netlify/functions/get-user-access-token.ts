import axios from 'axios'
import {  base64urlencode } from '../../src/utils/random-generator'
import { getAuthDoc, updateAuthDoc } from '../../src/utils/firebase.node'
require('dotenv').config()

exports.handler = async (event) => {
    try {
        const { authCode, authSession } = JSON.parse(event.body)
        const authDoc = await getAuthDoc(authSession)
        const { codeVerifier } = authDoc

        const authorization = base64urlencode(`${process.env.REACT_APP_CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        const headers = {
            'Authorization' : `Basic ${authorization}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        const data = `grant_type=authorization_code&code=${authCode}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&client_id=${process.env.REACT_APP_CLIENT_ID}&code_verifier=${codeVerifier}`
        const response = await axios.post(`https://accounts.spotify.com/api/token`,
            data,
        {
            headers : headers,
        })
        const {access_token, expires_in, refresh_token} = response.data
        const expires_at = (Date.now()/1000) + expires_in
        const payload = {authSession, access_token, expires_in, refresh_token, expires_at}
        console.log(payload)
        await updateAuthDoc(payload)
        return {
            statusCode: 200,
            body: JSON.stringify(payload)
        }
    } catch(error) {
        // console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}