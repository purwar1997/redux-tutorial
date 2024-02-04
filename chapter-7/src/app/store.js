import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import notificationsReducer from './slices/notificationsSlice';
import apiSlice from './slices/apiSlice';

const appStore = configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default appStore;
