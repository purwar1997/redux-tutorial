import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import appStore from './app/store';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));

// Redux store can be imported here because index.js is not a component

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
