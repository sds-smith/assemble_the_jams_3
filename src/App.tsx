import { useEffect, useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { PlayerProvider } from './contexts/player.context';
import { ResponsiveProvider } from './contexts/responsive.context';

import Navigation from './routes/navigation/navigation.component';
import PreSignIn from './routes/pre-sign-in/pre-sign-in.component';
import SpotifyPlayer from './routes/spotify-player/spotify-player.component';
import Auth from './routes/auth/auth.component';

import { selectClientToken, selectAccessToken, selectAuthSession } from './store/auth/auth.selector';
import { setClientToken, setAuthSession, setAccessToken } from './store/auth/auth.action';
import { UserContext } from './contexts/user.context';
import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setUserLoading, setCurrentUser, defaultCurrentUser } = useContext(UserContext)
  const clientToken = useSelector(selectClientToken)
  const accessToken = useSelector(selectAccessToken)
  const authSession = useSelector(selectAuthSession)

  useEffect(() => {

    if (!clientToken) {
      const getClientToken = async () => {
        const response = await Spotify.getClientToken()
        if (response) {
          const { token, expiresIn } = response
          dispatch(setClientToken(token))        
          window.setTimeout(() => {
            dispatch(setClientToken(''))
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
            navigate(`/user/${user.display_name}`)

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
      <Route path='/' element={ 
                                <PlayerProvider>
                                  <ResponsiveProvider> 
                                    <Navigation /> 
                                  </ResponsiveProvider>
                                </PlayerProvider> 
                              } 
        >
        <Route index element={ <PreSignIn /> } />
        <Route path='/user/*' element={ <SpotifyPlayer /> } />
        <Route path='/callback' element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
