require('dotenv').config()
const axios = require('axios').default
const {getAuthAccessToken, createUserDocumentFromAuth} = require('../../src/utils/firebase')

exports.handler = async (event) => {
    try {
        const {authSession} = JSON.parse(event.body)
        const accessToken = await getAuthAccessToken(authSession) 

        const headers = await { Authorization : `Bearer ${accessToken}` }
        const response = await axios.get('https://api.spotify.com/v1/me',{headers : headers})
        const user = response.data
        await createUserDocumentFromAuth(user)
        return {
            statusCode: 200,
            body: JSON.stringify(user)
        }
    } catch(error) {
        console.log({ error })
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}
