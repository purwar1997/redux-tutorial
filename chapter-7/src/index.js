import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { worker } from './api/server';
import store from './app/store';
import apiSlice from './app/slices/apiSlice';
import App from './App';
import './index.css';

const start = async () => {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  store.dispatch(apiSlice.endpoints.getUsers.initiate());

  const root = createRoot(document.getElementById('root'));

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

start();