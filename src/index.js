import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/auth.context';
import { PlayerProvider } from './contexts/player.context';
import * as serviceWorker from './serviceWorkerRegistration'
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </AuthProvider>
  </React.StrictMode>
);

serviceWorker.register()