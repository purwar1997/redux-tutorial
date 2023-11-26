import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

const appStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default appStore;
