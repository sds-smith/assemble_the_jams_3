import { useEffect, useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component'
import LogIn from './routes/log-in/log-in.component';
import NewUser from './routes/new-user/new-user.component';
import Auth from './components/auth/auth.component';

import { selectAccessToken, selectClientToken } from './store/auth/auth.selector';
import { setClientToken, setAuthSession, setAccessToken } from './store/auth/auth.action';
import { UserContext } from './contexts/user.context';
import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const clientToken = useSelector(selectClientToken)
  const accessToken = useSelector(selectAccessToken)
  const { setUserLoading, setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const unregisteredMessage = () => {
    navigate('/log-in')
    setTimeout(() => {
      window.alert('Please complete registration process and wait for verification email.')
    }, 2000)
  }

  useEffect( () => {
    if (!clientToken) {
      const getClientToken = async () => {
        const { token, expiresIn } = await Spotify.getClientToken()
        dispatch(setClientToken(token))
        window.setTimeout(() => {
          dispatch(setClientToken(''))
        }, expiresIn * 1000)
      }
      getClientToken()
    }
    if (accessToken) {
      setUserLoading(true)
      const getUserProfile = async () => {
        try {
          const user = await Spotify.getUserProfile(accessToken)
          if (user.display_name) {
            setCurrentUser(user)
            setUserLoading(false)
            navigate('/')            
          } else {
            setUserLoading(false)
            unregisteredMessage()
          }
        } catch(error) {
          setUserLoading(false)
          dispatch(setAuthSession(''))
          dispatch(setAccessToken(''))
        }
      }
      getUserProfile()
    } else {
      setCurrentUser('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, clientToken])

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
