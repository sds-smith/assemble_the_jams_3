require('dotenv').config()
import { generateRandomString, generateCodeChallenge, pkce_challenge_from_verifier } from '../../src/utils/random-generator'
import { createAuthDocumentFromSession } from '../../src/utils/firebase.node'

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


