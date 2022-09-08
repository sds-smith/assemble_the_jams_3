require('dotenv').config()
import axios from 'axios'
import {getAuthDoc} from '../../src/utils/firebase.node'

exports.handler = async (event) => {
    try {
        const {authSession, searchTerm} = JSON.parse(event.body)
        const {accessToken} = await getAuthDoc(authSession) 
        const headers =  { Authorization : `Bearer ${accessToken}` }

        const response = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{headers : headers})
        const searchResults = response.data

        const seeds = searchResults.tracks.items.slice(0, 5).map(track => track.id)

        const recommendationsResponse = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${seeds}`,{headers : headers})
        const recommendations = recommendationsResponse.data
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                searchResults,
                recommendations
            })
        }
    } catch(error) {
        console.log({ error })
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}