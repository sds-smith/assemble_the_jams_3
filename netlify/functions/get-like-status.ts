require('dotenv').config()
import axios from 'axios'
import {getAuthDoc} from '../../src/utils/firebase.node'

exports.handler = async (event) => {
    try {
        const {authSession, trackId} = JSON.parse(event.body)
        const {accessToken} = await getAuthDoc(authSession) 

        const headers = { Authorization : `Bearer ${accessToken}` }
        const response = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,{headers : headers})
        const status = response.data[0]
        
        return {
            statusCode: 200,
            body: JSON.stringify({status})
        }
    } catch(error) {
        console.log({ error })
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}
