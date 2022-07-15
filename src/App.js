import { useEffect, useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component'
import LogIn from './routes/log-in/log-in.component';
import NewUser from './routes/new-user/new-user.component';
import Auth from './components/auth/auth.component';

import { UserContext } from './contexts/user.context';
import { TrackContext } from './contexts/track.context';

import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {

  const { accessToken, currentUser, setCurrentUser } = useContext(UserContext)
  const { playlistTracks, setPlaylistTracks, playlistName, setPlaylistName } = useContext(TrackContext)

  const savePlaylist = async () => {
    const trackURIs = playlistTracks.map(track => track.uri)
    try {
      const response = await Spotify.savePlaylist(accessToken, currentUser, playlistName, trackURIs)
      setPlaylistName(response.playlistName)
      setPlaylistTracks(response.playlistTracks)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect( () => {
    if (accessToken) {
      const getUserProfile = async () => {
        const user = await Spotify.getUserProfile(accessToken)
        setCurrentUser(user)
      }
      getUserProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  return (
    <Routes >
      <Route path='/' element={ <Navigation /> } >
        <Route index element={ <Home 
                      onSave={savePlaylist}
                    /> } 
        />
        <Route path='log-in' element={ <LogIn /> } />
        <Route path='new-user' element={ <NewUser /> } />
      </Route>
      <Route path='callback' element={<Auth />} />
    </Routes>
  );
}

export default App;
