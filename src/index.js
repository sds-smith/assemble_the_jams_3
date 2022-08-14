import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorkerRegistration'
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/auth.context';
import { PlayerProvider } from './contexts/player.context';
import { TrackProvider } from './contexts/track.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <AuthProvider>
        <TrackProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>        
        </TrackProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorker.register()