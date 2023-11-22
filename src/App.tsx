import { useEffect, useContext } from 'react';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';

import { ResponsiveProvider } from './contexts/responsive.context';
import { TrackProvider } from './contexts/track.context';
import { AuthContext } from './contexts/auth.context';

import { useAudio } from './utils/custom-hooks/use-audio';

import './App.css';

const App = () => {
  const { currentUserExists } = useContext(AuthContext);
  const { audioPlayer, spotifyPlayer } = useAudio();

useEffect(() => {
  if (currentUserExists) {
    spotifyPlayer();
  } else {
    audioPlayer();
  };
}, [currentUserExists]);

  return (
    <ResponsiveProvider>
      <Navigation />
        <TrackProvider>
          <Home />
        </TrackProvider>
    </ResponsiveProvider> 
  );
};

export default App;
