import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/auth.context';
import { PlayerProvider } from './contexts/player.context';
import { apolloClient } from './utils/graphql/apollo-client';
import * as serviceWorker from './serviceWorkerRegistration'
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);

serviceWorker.register()