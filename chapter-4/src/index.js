import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { fetchPosts } from './app/slices/postsSlice';
import { fetchUsers } from './app/slices/usersSlice';
import appStore from './app/store';
import App from './App';
import './index.css';

// action will get dispatched before app is initialized or App component is rendered
appStore.dispatch(fetchPosts());
appStore.dispatch(fetchUsers());

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
