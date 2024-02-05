import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './slices/apiSlice';
import notificationsReducer from './slices/notificationsSlice';

const appStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    notifications: notificationsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default appStore;
