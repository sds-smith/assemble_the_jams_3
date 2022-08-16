require('dotenv').config()
const { createUserDocumentFromReg } = require('../../src/utils/firebase.node')

exports.handler = async (event) => {
    try {
        const { name, email } = JSON.parse(event.body)
        const userDocRef = await createUserDocumentFromReg({name, email})

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                userDocRef
            })
        }
    } catch(error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}