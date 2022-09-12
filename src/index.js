import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorkerRegistration'
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { ClientProvider } from './contexts/client.context';
import { UserProvider } from './contexts/user.context';
import { PlayerProvider } from './contexts/player.context';
import { ResponsiveProvider } from './contexts/responsive.context';
import { store, persistor } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate persistor={persistor} >
        <BrowserRouter >
          <ClientProvider>
            <UserProvider>
                <PlayerProvider>
                  <ResponsiveProvider>
                    <App />
                  </ResponsiveProvider>
                </PlayerProvider>        
            </UserProvider>  
          </ClientProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

serviceWorker.register()