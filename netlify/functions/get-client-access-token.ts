import  axios from 'axios'
import {  base64urlencode } from '../../src/utils/random-generator'
require('dotenv').config()

exports.handler = async (event) => {
    try {

        const authorization = base64urlencode(`${process.env.REACT_APP_CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        const headers = {
            'Authorization' : `Basic ${authorization}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        const data = `grant_type=client_credentials`
        const response = await axios.post(`https://accounts.spotify.com/api/token`,
            data,
        {
            headers : headers,
        })
        const token = response.data.access_token
        const expires_in = response.data.expires_in
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                token,
                expires_in
            })
        }
    } catch(error) {
        console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}