import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorkerRegistration'
import './index.css';

import { Provider } from 'react-redux';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { PlayerProvider } from './contexts/player.context';
import { TrackProvider } from './contexts/track.context';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter >
        <UserProvider>
          <TrackProvider>
            <PlayerProvider>
              <App />
            </PlayerProvider>        
          </TrackProvider>
        </UserProvider>  
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

serviceWorker.register()