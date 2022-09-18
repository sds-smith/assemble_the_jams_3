import axios from 'axios'
import {getAuthDoc} from '../../src/utils/firebase.node'
require('dotenv').config()

exports.handler = async (event) => {
    const {authSession, trackId, isLike} = JSON.parse(event.body)
    const {accessToken} = await getAuthDoc(authSession) 
    const headers = { 
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${accessToken}`,
    }
    const method = isLike ? 'DELETE' : 'PUT'
    const message = isLike ? 'Removed from Liked Songs' : 'Added to Liked Songs'
    try {
        await axios(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
        {
            headers : headers,
            method : method
        })
        return {
        statusCode: 200,
        body: JSON.stringify({
            message,
            isLike : !isLike
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
