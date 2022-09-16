import axios from 'axios'
import {  base64urlencode } from '../../src/utils/random-generator'
import { updateAuthDoc } from '../../src/utils/firebase.node'
require('dotenv').config()

exports.handler = async (event) => {
    try {
        const { refreshToken, authSession } = JSON.parse(event.body)

        const authorization = base64urlencode(`${process.env.REACT_APP_CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        const headers = {
            'Authorization' : `Basic ${authorization}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        const data = `grant_type=refresh_token&refresh_token=${refreshToken}&&client_id=${process.env.REACT_APP_CLIENT_ID}`
        const response = await axios.post(`https://accounts.spotify.com/api/token`,
            data,
        {
            headers : headers,
        })
        const {access_token, expires_in} = response.data
        const refresh_token = ''
        const expires_at = (Date.now()/1000) + expires_in
        const payload = {authSession, access_token, expires_in, expires_at, refresh_token}
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