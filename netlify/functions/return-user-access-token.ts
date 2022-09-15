require('dotenv').config()
import {getAuthDoc} from '../../src/utils/firebase.node'

exports.handler = async (event) => {
    try {
        const {authSession} = JSON.parse(event.body)
        const {accessToken} = await getAuthDoc(authSession) 
        
        return {
            statusCode: 200,
            body: JSON.stringify({accessToken})
        }
    } catch(error) {
        console.log({ error })
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}