import { useEffect, useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navigation from './routes/navigation/navigation.component';
import AudioElement from './routes/audio-element/audio-element.component';
import SpotifyPlayer from './routes/spotify-player/spotify-player.component';
import Auth from './routes/auth/auth.component';

import { selectClientToken, selectAccessToken, selectAuthSession, selectExpiresAt, selectRefreshToken } from './store/auth/auth.selector';
import { setClientToken, setAuthSession, setAccessToken, setRefreshToken, setExpiresAt } from './store/auth/auth.action';
import { UserContext } from './contexts/user.context';
import { useSignIn } from './utils/custom-hooks/use-sign-in';
import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const clientToken = useSelector(selectClientToken)
  const accessToken = useSelector(selectAccessToken)
  const authSession = useSelector(selectAuthSession)
  const expiresAt = useSelector(selectExpiresAt)
  const refreshToken = useSelector(selectRefreshToken)

  const { setUserLoading, setCurrentUser, defaultCurrentUser } = useContext(UserContext)
  const { signOut } = useSignIn()

  useEffect(() => {
    if (!clientToken) {
      const getClientToken = async () => {
        const response = await Spotify.getClientToken()
        if (response) {
          const { token, expires_in } = response
          dispatch(setClientToken(token) )       
          window.setTimeout(() => {
            dispatch(setClientToken(''))
          }, expires_in * 1000)
        }
      }
      getClientToken()
    }
    if (accessToken) {
      const expiresIn = expiresAt - (Date.now()/1000)
      if (expiresIn <= 0) {
        signOut()
      } else {
        window.setTimeout(() => {
          if (refreshToken) {
            const refresh = async () => {
              const refreshResponse = await Spotify.refreshUserToken(refreshToken, authSession)
              if (refreshResponse) {
                const {access_token, expires_at, refresh_token} = refreshResponse
                dispatch(setAccessToken(access_token))
                dispatch(setRefreshToken(refresh_token))
                dispatch(setExpiresAt(expires_at))
              }
            }
            refresh()
          } else {
            signOut()
          }
        }, expiresIn * 1000)
      }
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
      <Route path='/' element={ <Navigation /> } >
        <Route index element={ <AudioElement /> } />
        <Route path='/user/*' element={ <SpotifyPlayer /> } />
        <Route path='/callback' element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
