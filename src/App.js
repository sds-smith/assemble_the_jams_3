import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component'
import LogIn from './routes/log-in/log-in.component';
import NewUser from './routes/new-user/new-user.component';
import Auth from './components/auth/auth.component';

import { Spotify } from './utils/spotify';

import './App.css';

const App = () => {
  const [accessToken, setAccessToken] = useState('')
  const [authSession, setAuthSession] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [playlistName, setPlaylistName] = useState("Enter New Playlist Name")
  const [searchLoading, setSearchLoading] = useState(false)
  const [playLoading, setPlayLoading] = useState(false)
  const [deviceID, setDeviceId] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState(undefined)
  const [nowPlaying, setNowPlaying] = useState({
    hasTrack: false,
    track : {},
    isLike : null
  })
  const [gradientAngle, setGradientAngle] = useState(135)

  const togglePlayLoading = () => {
    setPlayLoading(!playLoading)
  }


  const playTrack = async (track) => {
    togglePlayLoading()
    const hasTrack = true
    const isLike = await Spotify.getLikeStatus(accessToken, track.id)
    setNowPlaying({hasTrack, track, isLike})
    const uri = `spotify:track:${track.id}`
    Spotify.play(deviceID, {
      playerInstance : currentPlayer,
      spotify_uri : uri,
    })
    togglePlayLoading()
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
      <Route path='/' element={ <Navigation authSession={authSession} /> } >
        <Route index element={ <Home 
                      authSession={authSession}
                      currentUser={currentUser}
                      searchResults={searchResults}
                      playlistTracks={playlistTracks}
                      recommendations={recommendations}
                      playlistName={playlistName}
                      setPlaylistName={setPlaylistName}
                      setSearchResults={setSearchResults}
                      setRecommendations={setRecommendations}
                      onAdd={addToPlaylist}
                      onRemove={removeFromPlaylist}
                      onPlay={playTrack}
                      onSave={savePlaylist}
                      searchLoading={searchLoading}
                      setSearchLoading={setSearchLoading}
                      gradientAngle={gradientAngle}
                      setGradientAngle={setGradientAngle}
                      accessToken={accessToken}
                      deviceID={deviceID}
                      setDeviceId={setDeviceId}
                      currentPlayer={currentPlayer}
                      setCurrentPlayer={setCurrentPlayer}
                      nowPlaying={nowPlaying}
                      setNowPlaying={setNowPlaying}
                    /> } 
        />
        <Route path='log-in' element={ <LogIn /> } />
        <Route path='new-user' element={ <NewUser /> } />
      </Route>
      <Route path='/callback' element={<Auth setAuthSession={setAuthSession} setAccessToken={setAccessToken} accessToken={accessToken} />} />
    </Routes>
  );
}

export default App;
