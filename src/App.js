import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component'
import LogIn from './routes/log-in/log-in.component';
import NewUser from './routes/new-user/new-user.component';
import Auth from './components/auth/auth.component';

import logo from './logo.svg';
import './App.css';

const App = () => {
  const [hasAccessToken, setHasAccessToken] = useState(false)
  const [authSession, setAuthSession] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

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
                      authSession={authSession}
                      currentUser={currentUser}
                    /> } 
        />
        <Route path='log-in' element={ <LogIn /> } />
        <Route path='new-user' element={ <NewUser /> } />
        <Route path='/callback' element={<Auth setAuthSession={setAuthSession} setHasAccessToken={setHasAccessToken} />} />
      </Route>

    </Routes>

  );
}

export default App;
