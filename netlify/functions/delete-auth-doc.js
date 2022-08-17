require('dotenv').config()
const { deleteAuthDocumentFromSession } = require('../../src/utils/firebase.node')

exports.handler = async (event) => {
    try {
        const { session } = JSON.parse(event.body)

        await deleteAuthDocumentFromSession(session)
        return {
            statusCode: 200,
            body: JSON.stringify({ 
               message: 'success'
            })
        }
    } catch(error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}


