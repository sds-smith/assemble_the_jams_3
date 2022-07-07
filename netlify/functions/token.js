require('dotenv').config()
const {getAuthAccessToken} = require('../../src/utils/firebase')

exports.handler = async (event) => {
    try {
        const {authSession} = JSON.parse(event.body)
        const accessToken = await getAuthAccessToken(authSession) 

        return {
            statusCode: 200,
            body: JSON.stringify(accessToken)
        }
    } catch(error) {
        console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}