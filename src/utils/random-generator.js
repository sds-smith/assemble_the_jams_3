const crypto = require('crypto')

function generateRandomString() {
  const array = crypto.randomBytes(32);
  return Array.from(array, dec2hex).join('');
}

function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

function sha256(plain) { // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a) {
  // Convert the ArrayBuffer to string using Uint8 array.
  // btoa takes chars from 0-255 and base64 encodes.
  // Then convert the base64 encoded to base64url encoded.
  // (replace + with -, replace / with _, trim trailing =)
  return Buffer.from(a).toString('base64')
    // .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function pkce_challenge_from_verifier(v) {
  const hashed = await sha256(v);
  const base64encoded = base64urlencode(hashed);
  return base64encoded;
}

  function generateCodeChallenge(code_verifier) {
    const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64')
    return code_challenge.toString().replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  function base64URL(string) {
    return string.toString(Crypto.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  module.exports = { generateRandomString, base64urlencode, generateCodeChallenge, base64URL, pkce_challenge_from_verifier }