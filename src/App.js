import { useEffect, useState } from 'react'
import { generateRandomString } from './utils/random-state-generator';
// import { createUserDocumentFromAuth, getAuthAccessToken, isNewUser, setName, createAuthDocumentFromSpotify } from './utils/firebase';

import logo from './logo.svg';
import './App.css';

const scope = encodeURIComponent('user-read-private user-read-email')
const state = generateRandomString()
const SpotifyAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${scope}&state=${state}&code_challenge_method=S256&code_challenge=${process.env.REACT_APP_AUTH_CHALLENGE}&redirect_uri=http://localhost:8888/`

const App = () => {
  const [hasAccessToken, setHasAccessToken] = useState(false)
  const [authSession, setAuthSession] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [inputDisabled, setInputDisabled] = useState(true)

  const displayName = currentUser ? currentUser.display_name : ''
  const profilePic = currentUser ? currentUser.images[0].url : ''

  const createAuthDoc = async (session, authCode) => {
    try {
      const response = await fetch('/.netlify/functions/create-auth-doc', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({session, authCode})
      })
      const {hasToken} = await response.json()
      setHasAccessToken(hasToken)
      
    } catch(error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setUserName(e.target.value)
  }

  // const addUsername = () => {
    // setName(currentUser, userName)
  // }

  useEffect(() => {
    const authCodeMatch = window.location.href.match(/code=([^&]*)/)
    if (authCodeMatch) {
        const session = authCodeMatch[1].slice(0, 6)
        const authCode = authCodeMatch[1]
        setAuthSession(session)
        // setHasAccessToken(true)
        createAuthDoc(session, authCode)
    // } else {
      // setHasAccessToken(false)
      // setAccessToken('')
    }
  }, [])

  useEffect(() => {
    if (hasAccessToken) {
      const getUserProfile = async () => {
        const response = await fetch('/.netlify/functions/get-user', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({authSession})
        })
        const user = await response.json()
        setCurrentUser(user)

        // if (await isNewUser(userDocRef)) {
          // setInputDisabled(false)
        // } else {
          // setInputDisabled(true)
        // }
      }
      getUserProfile()
    } 
  }, [hasAccessToken, userName])


  return (

    <div className="App">
      <header className="App-header">
        <div className='img-container'>
          <img src={currentUser ? profilePic : logo} className="App-logo" alt="logo" />
        </div>
        <h1>{currentUser ? displayName : 'Please Log In'}</h1>
        {/* {!inputDisabled && <input type='text' disabled={inputDisabled} onChange={handleChange} value={userName} placeholder='Enter First and Last Name' />} */}
        {/* {!inputDisabled && <button disabled={inputDisabled} onClick={addUsername} >REGISTER</button>} */}
        <a
          className="App-link"
          href={SpotifyAuth}
        >
          Sign in with Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
