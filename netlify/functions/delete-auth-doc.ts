require('dotenv').config()
import { deleteAuthDocumentFromSession } from '../../src/utils/firebase.node'

exports.handler = async (event) => {
    try {
        const { authSession } = JSON.parse(event.body)

        await deleteAuthDocumentFromSession(authSession)
        return {
            statusCode: 200,
            body: JSON.stringify({ 
               message: 'auth doc deleted'
            })
        }
    } catch(error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}


