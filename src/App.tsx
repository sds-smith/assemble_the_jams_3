import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navigation from './routes/navigation/navigation.component';
import AudioElement from './routes/audio-element/audio-element.component';
import SpotifyPlayer from './routes/spotify-player/spotify-player.component';
import Auth from './routes/auth/auth.component';

import { ResponsiveProvider } from './contexts/responsive.context';

import { selectAccessToken, selectAuthSession, selectExpiresAt, selectRefreshToken } from './store/auth/auth.selector';
import { setAuthSession, setAccessToken, setRefreshToken, setExpiresAt } from './store/auth/auth.action';
import { setUserLoading, setCurrentUser } from './store/user/user.action';
import { selectCurrentUserExists } from './store/user/user.selector';
import { defaultCurrentUser } from './store/user/user.types';
import { useSignIn } from './utils/custom-hooks/use-sign-in';
import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector(selectAccessToken)
  const authSession = useSelector(selectAuthSession)
  const expiresAt = useSelector(selectExpiresAt)
  const refreshToken = useSelector(selectRefreshToken)
  const currentUserExists = useSelector(selectCurrentUserExists)

  const { signOut } = useSignIn()

  useEffect(() => {
    if (accessToken) {
      const expiresIn = expiresAt - (Date.now()/1000)
      const expiredTokenAction = () => {
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
      }
      if (expiresIn <= 0) {
        expiredTokenAction()
      } else {
        window.setTimeout(() => {
          expiredTokenAction()
        }, expiresIn * 1000)
      }
      dispatch(setUserLoading(true))
      const getUserProfile = async () => {
        try {
          const user = await Spotify.getUserProfile(authSession)
          if (user && user.display_name) {
            dispatch(setCurrentUser(user))
            dispatch(setUserLoading(false))
            navigate(`/user/${user.display_name}`)
          } else {
            dispatch(setUserLoading(false))
            console.log('no user returned from Spotify.')
          }
        } catch(error) {
          dispatch(setUserLoading(false))
          dispatch(setAuthSession(''))
          dispatch(setAccessToken(''))
          console.log('error occurred with logging in.')
        }
      }
      getUserProfile()
    } else {
      if (currentUserExists) {
        dispatch(setCurrentUser(defaultCurrentUser))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  return (
    <Routes >
      <Route path='/' element={ 
                                <ResponsiveProvider>
                                  <Navigation />
                                </ResponsiveProvider> 
                              }>
        <Route index element={ <AudioElement /> } />
        <Route path='/user/*' element={ <SpotifyPlayer /> } />
        <Route path='/callback' element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
