
export function generateRandomString() {
    var array = new Uint32Array(56/2);
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
  }

  function dec2hex(dec) {
    return ('0' + dec.toString(16)).slice(-2)
  }