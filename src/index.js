import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/auth.context';
import * as serviceWorker from './serviceWorkerRegistration'
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate persistor={persistor} >
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

serviceWorker.register()