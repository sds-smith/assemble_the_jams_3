require('dotenv').config()
const axios = require('axios').default
const {getAuthAccessToken} = require('../../src/utils/firebase')

exports.handler = async (event) => {
    try {
        const {authSession, currentUser, playlistName, trackURIs} = JSON.parse(event.body)
        const accessToken = await getAuthAccessToken(authSession) 
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
                message: 'success',
                playlistName: 'Enter New Playlist Name',
                playlistTracks: []
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