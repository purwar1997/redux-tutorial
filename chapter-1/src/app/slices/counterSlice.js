import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value = state.value + 1;
    },
    decrement(state) {
      state.value = state.value - 1;
    },
    reset(state) {
      state.value = 0;
    },
    incrementByValue(state, action) {
      state.value = state.value + action.payload;
    },
    decrementByValue(state, action) {
      state.value = state.value - action.payload;
    },
  },
});

// These are all action creators which have the same name as reducers
// Action creator returns an action object

export const { increment, decrement, reset, incrementByValue, decrementByValue } =
  counterSlice.actions;

// Thunk creator returns thunk function which handles asynchronous logic
// Async logic can't be put inside reducers

export const incrementValueAsync = value => dispatch => {
  setTimeout(() => {
    dispatch(incrementByValue(value));
  }, 1000);
};

export const decrementValueAsync = value => dispatch => {
  setTimeout(() => {
    dispatch(decrementByValue(value));
  }, 1000);
};

export default counterSlice.reducer;
