import { useEffect, useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component'
import LogIn from './routes/log-in/log-in.component';
import NewUser from './routes/new-user/new-user.component';
import Auth from './components/auth/auth.component';

import { UserContext } from './contexts/user.context';
import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {
  const { accessToken, setUserLoading, setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect( () => {
    if (accessToken) {
      setUserLoading(true)
      const getUserProfile = async () => {
        try {
          const user = await Spotify.getUserProfile(accessToken)
          setCurrentUser(user)
          setUserLoading(false)
          navigate('/')
        } catch(error) {
          setUserLoading(false)
          window.alert('Please complete registration process and wait for verification email.')
          navigate('/login')
        }
      }
      getUserProfile()
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  return (
    <Routes >
      <Route path='/' element={ <Navigation /> } >
        <Route index element={ <Home /> } />
        <Route path='log-in' element={ <LogIn /> } />
        <Route path='new-user' element={ <NewUser /> } />
      </Route>
      <Route path='callback' element={<Auth />} />
    </Routes>
  );
}

export default App;
