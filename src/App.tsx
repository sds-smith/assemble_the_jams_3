import { useEffect, useContext } from 'react';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';

import { ResponsiveProvider } from './contexts/responsive.context';
import { PlayerProvider } from './contexts/player.context';
import { TrackProvider } from './contexts/track.context';
import { AuthContext } from './contexts/auth.context';

// import { useAudio } from './utils/custom-hooks/use-audio';

import './App.css';

const App = () => {
  const { currentUserExists } = useContext(AuthContext);
  // const {audioPlayer} = useAudio();

useEffect(() => {
  if (currentUserExists) {
  //   audioPlayer();
  // } else {
  //   audioPlayer();
  };
}, [currentUserExists])

  return (
    <ResponsiveProvider>
      <Navigation />
      <PlayerProvider>
        <TrackProvider>
          <Home />
        </TrackProvider>
      </PlayerProvider>
    </ResponsiveProvider> 
  )
}

export default App;
