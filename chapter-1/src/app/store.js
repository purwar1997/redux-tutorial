import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

// Redux store needs to have a single root reducer
// configureStore internally uses combineReducers to create root reducer

const appStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default appStore;
