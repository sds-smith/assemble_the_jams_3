require('dotenv').config()
const { generateRandomString, generateCodeChallenge, pkce_challenge_from_verifier } = require('../../src/utils/random-generator')
const { createAuthDocumentFromSession } = require('../../src/utils/firebase.node')
const { CreateAuthDocumentFromSessionProps } = require('../../src/utils/firebase.types')
exports.handler = async (event) => {
    try {
        const { session } = JSON.parse(event.body)
        const state = generateRandomString()
        const codeVerifier = generateRandomString()
        const codeChallenge = generateCodeChallenge(codeVerifier)

        await createAuthDocumentFromSession({session, state, codeVerifier})
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                codeChallenge,
                state
            })
        }
    } catch(error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}


