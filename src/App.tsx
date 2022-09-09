import { useEffect, useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component'
import Auth from './components/auth/auth.component';

import { selectAccessToken, selectAuthSession } from './store/auth/auth.selector';
import { setAuthSession, setAccessToken } from './store/auth/auth.action';
import { ClientContext } from './contexts/client.context';
import { UserContext } from './contexts/user.context';
import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const {clientToken, setClientToken} = useContext(ClientContext)
  const accessToken = useSelector(selectAccessToken)
  const authSession = useSelector(selectAuthSession)
  const { setUserLoading, setCurrentUser, defaultCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!clientToken) {
      const getClientToken = async () => {
        const response = await Spotify.getClientToken()
        if (response) {
          const { token, expiresIn } = response
          setClientToken(token)        
          window.setTimeout(() => {
            setClientToken('')
          }, expiresIn * 1000)
        }


      }
      getClientToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect( () => {
    if (accessToken) {
      setUserLoading(true)
      const getUserProfile = async () => {
        try {
          const user = await Spotify.getUserProfile(authSession)
          if (user && user.display_name) {
            setCurrentUser(user)
            setUserLoading(false)
            navigate('/')            
          } else {
            setUserLoading(false)
            window.alert('problem logging in.  Please contact app support')
          }
        } catch(error) {
          setUserLoading(false)
          dispatch(setAuthSession(''))
          dispatch(setAccessToken(''))
          window.alert('problem logging in.  Please contact app support')
        }
      }
      getUserProfile()
    } else {
      setCurrentUser(defaultCurrentUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  return (
    <Routes >
      <Route path='/' element={ <Navigation /> } >
        <Route index element={ <Home /> } />
        <Route path='/callback' element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;