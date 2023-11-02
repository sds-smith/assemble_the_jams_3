import React from 'react'

import Navigation from './routes/navigation/navigation.component';
import SpotifyPlayer from './routes/spotify-player/spotify-player.component';
import AudioElement from './routes/audio-element/audio-element.component';

import { ResponsiveProvider } from './contexts/responsive.context';

import './App.css';

const App = () => {


  return (
    <ResponsiveProvider>
      <Navigation />
      {false
        ? <SpotifyPlayer />
        : <AudioElement />
      }
    </ResponsiveProvider> 
  )
}

export default App;
