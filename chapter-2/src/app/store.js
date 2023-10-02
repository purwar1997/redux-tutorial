import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import usersReducer from './slices/usersSlice';

const appStore = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export default appStore;
