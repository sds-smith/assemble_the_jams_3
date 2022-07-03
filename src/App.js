import { useEffect, useState } from 'react'
// import { createUserDocumentFromAuth, getAuthAccessToken, isNewUser, setName, createAuthDocumentFromSpotify } from './utils/firebase';

import logo from './logo.svg';
import './App.css';

const scope = encodeURIComponent('user-read-private user-read-email')
const SpotifyAuth = `https://accounts.spotify.com/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${scope}&redirect_uri=http://localhost:8888/`

const App = () => {
  const [hasAccessToken, setHasAccessToken] = useState(false)
  const [authSession, setAuthSession] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [inputDisabled, setInputDisabled] = useState(true)

  const displayName = currentUser ? currentUser.display_name : ''
  const profilePic = currentUser ? currentUser.images[0].url : ''

  const setAccessToken = async (session, accessToken) => {
    console.log({hasAccessToken, authSession, session, accessToken})
    // await createAuthDocumentFromSpotify(session, accessToken)
    const response = await fetch('/.netlify/functions/create-auth-doc', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({session, accessToken})
    })
  }

  const handleChange = (e) => {
    setUserName(e.target.value)
  }

  // const addUsername = () => {
    // setName(currentUser, userName)
  // }

  // const getUser = async () => {  
    // const accessToken = await getAuthAccessToken(authSession)          
    // const headers = { Authorization : `Bearer ${accessToken}` }
    // const response = await fetch('https://api.spotify.com/v1/me',{headers : headers})
    // const user = await response.json()
    // return user
  // }

  useEffect(() => {
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
    if (accessTokenMatch) {
        const session = accessTokenMatch[1].slice(0, 6)
        const accessToken = accessTokenMatch[1]
        setAuthSession(session)
        setHasAccessToken(true)
        setAccessToken(session, accessToken)
    } else {
      setHasAccessToken(false)
      // setAccessToken('')
    }
  }, [])

  useEffect(() => {
    if (hasAccessToken) {
      console.log({authSession})
      const getUserProfile = async () => {
        // const user = await getUser()
        const response = await fetch('/.netlify/functions/get-user', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({authSession})
        })
        const user = await response.json()
        setCurrentUser(user)

        // const userDocRef = await createUserDocumentFromAuth(user)
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
