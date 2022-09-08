require('dotenv').config()
import axios from 'axios'
import {getAuthDoc} from '../../src/utils/firebase.node'

exports.handler = async (event) => {
    try {
        const {authSession, currentUser, playlistName, trackURIs} = JSON.parse(event.body)
        const {accessToken} = await getAuthDoc(authSession) 
        const userId = currentUser.id
        const headers =  { Authorization : `Bearer ${accessToken}` }

        const data = JSON.stringify({
            name : playlistName,
        })
        const playlistResponse = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,
            data,
        {
            headers : headers,
        })        
        const playlistID = playlistResponse.data.id

        const body = JSON.stringify({
            uris : trackURIs,
        })

        await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
            body,
        {
            headers : headers,
        })    
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Playlist has been saved to your Spotify account',
                playlistName: 'Name Your New Playlist',
                playlistTracks: [],
                searchResults: []
            })
        }
    } catch(error) {
        console.log(error.response.data )
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}