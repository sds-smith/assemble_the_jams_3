import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserProvider } from './contexts/user.context';
import { PlayerProvider } from './contexts/player.context';
import { TrackProvider } from './contexts/track.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <UserProvider>
        <TrackProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>        
        </TrackProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
