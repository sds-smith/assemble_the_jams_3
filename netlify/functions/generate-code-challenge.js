const { generateRandomString, base64urlencode, generateCodeChallenge, base64URL, pkce_challenge_from_verifier } = require('../../src/utils/random-generator')


exports.handler = async (event) => {
    console.log('I am generating a code challenge now')
    const codeVerifier = generateRandomString()
    const codeChallenge = generateCodeChallenge(codeVerifier)
    console.log({codeVerifier})
    console.log({codeChallenge})

    return {
        statusCode: 200,
        body: JSON.stringify({ 
            message: 'I have generated a code challenge',
            codeChallenge
        })
    }
}