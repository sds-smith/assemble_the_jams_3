require('dotenv').config()
const axios = require('axios').default
const {createAuthDocumentFromSpotify} = require('../../src/utils/firebase')

exports.handler = async (event) => {
    try {
        const {session, accessToken} = JSON.parse(event.body)
        const authDocRef = await createAuthDocumentFromSpotify(session, accessToken)
        return {
            statusCode: 200,
            body: JSON.stringify({ authDocRef })
        }
    } catch(error) {
        console.log({ error })
        return {
            status: 400,
            body: JSON.stringify({error})
        }
    }
}