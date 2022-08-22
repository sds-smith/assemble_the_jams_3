require('dotenv').config()
const axios = require('axios').default
const {getAuthDoc} = require('../../src/utils/firebase.node')

exports.handler = async (event) => {
    try {
        const {authSession} = JSON.parse(event.body)
        const {accessToken} = await getAuthDoc(authSession) 

        const headers = { Authorization : `Bearer ${accessToken}` }
        const response = await axios.get('https://api.spotify.com/v1/me',{headers : headers})
        const user = response.data
        return {
            statusCode: 200,
            body: JSON.stringify({user})
        }
    } catch(error) {
        console.log({ error })
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}
