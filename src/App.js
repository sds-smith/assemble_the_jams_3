import { useEffect, useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component'
import LogIn from './routes/log-in/log-in.component';
import NewUser from './routes/new-user/new-user.component';
import Auth from './components/auth/auth.component';

import { UserContext } from './contexts/user.context';
import { TrackContext } from './contexts/track.context';
import { PlayerContext } from './contexts/player.context';

import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {

  const { accessToken, currentUser, setCurrentUser } = useContext(UserContext)
  const { playlistTracks, setPlaylistTracks, playlistName, setPlaylistName } = useContext(TrackContext)
  const { currentPlayer, deviceID, setNowPlaying } = useContext(PlayerContext)

  const playTrack = async (track) => {
    const hasTrack = true
    const isLike = await Spotify.getLikeStatus(accessToken, track.id)
    setNowPlaying({hasTrack, track, isLike})
    const uri = `spotify:track:${track.id}`
    Spotify.play(deviceID, {
      playerInstance : currentPlayer,
      spotify_uri : uri,
    })
  }
  
  const addToPlaylist = (track) => {
    let tracks = playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    setPlaylistTracks(tracks => [...tracks])
  }

  const removeFromPlaylist = (track) => {
    let newTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    setPlaylistTracks(newTracks)
  }

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
  }, [accessToken])

  return (
    <Routes >
      <Route path='/' element={ <Navigation /> } >
        <Route index element={ <Home 
                      onAdd={addToPlaylist}
                      onRemove={removeFromPlaylist}
                      onPlay={playTrack}
                      onSave={savePlaylist}
                    /> } 
        />
        <Route path='log-in' element={ <LogIn /> } />
        <Route path='new-user' element={ <NewUser /> } />
      </Route>
      <Route path='/callback' element={<Auth />} />
    </Routes>
  );
}

export default App;
