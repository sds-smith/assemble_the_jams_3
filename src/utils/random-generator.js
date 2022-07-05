const CryptoJS = require('crypto-js')

function generateRandomString() {
  var array = new Uint32Array(56/2);
  CryptoJS.getRandomValues(array);
  return Array.from(array, dec2hex).join('');
}

function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

function sha256(plain) { // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return CryptoJS.subtle.digest('SHA-256', data);
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
  hashed = await sha256(v);
  base64encoded = base64urlencode(hashed);
  return base64encoded;
}

  function generateCodeChallenge(code_verifier) {
    const code_challenge = base64URL(CryptoJS.SHA256(code_verifier))
    return code_challenge
  }

  function base64URL(string) {
    return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  }

  module.exports = { generateRandomString, base64urlencode, generateCodeChallenge, base64URL, pkce_challenge_from_verifier }