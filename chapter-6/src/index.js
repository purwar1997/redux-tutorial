import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { fetchUsers } from './app/slices/usersSlice';
import { worker } from './api/server';
import store from './app/store';
import App from './App';
import './index.css';

const start = async () => {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  store.dispatch(fetchUsers());

  const root = createRoot(document.getElementById('root'));

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

start();