import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { generateRandomString } from './utils/random-state-generator';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component'
import LogIn from './routes/log-in/log-in.component';
import NewUser from './routes/new-user/new-user.component';

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

  useEffect(() => {
    const authCodeMatch = window.location.href.match(/code=([^&]*)/)
    if (authCodeMatch) {
      if (!hasAccessToken) {
        const session = authCodeMatch[1].slice(0, 6)
        const authCode = authCodeMatch[1]
        setAuthSession(session)
        createAuthDoc(session, authCode)
      }
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
      }
      getUserProfile()
    } 
  }, [hasAccessToken])


  return (

    <Routes >
      <Route path='/' element={ <Navigation authSession={authSession} /> } >
        <Route index element={ <Home 
                      currentUser={currentUser}
                      profilePic={profilePic}
                      logo={logo}
                      SpotifyAuth={SpotifyAuth}
                      displayName={displayName}
                    /> } 
        />
        <Route path='log-in' element={ <LogIn SpotifyAuth={SpotifyAuth} /> } />
        <Route path='new-user' element={ <NewUser /> } />
      </Route>
    </Routes>

  );
}

export default App;
