import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorkerRegistration'
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { ResponsiveProvider } from './contexts/responsive.context';
import { PlayerProvider } from './contexts/player.context';
import { store, persistor } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate persistor={persistor} >
        <BrowserRouter >
            <UserProvider>
                <PlayerProvider>
                  <ResponsiveProvider>
                    <App />
                  </ResponsiveProvider>
                </PlayerProvider>        
            </UserProvider>  
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

serviceWorker.register()