import '@/components/keenicons/assets/styles.css';
import './styles/globals.css';
import { AuthProvider } from '@/auth/providers/AuthProvider';

import axios from 'axios';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { setupAxios } from './auth';
import { ProvidersWrapper } from './providers';
import React from 'react';

/**
 * Inject interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ProvidersWrapper>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ProvidersWrapper>
);
