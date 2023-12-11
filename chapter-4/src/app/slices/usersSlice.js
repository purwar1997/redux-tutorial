import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];

/*
export const fetchUsers = () => async dispatch => {
  try {
    const response = await axios.get(USERS_URL);
    dispatch(fetchUsersSucceded(response.data));
  } catch (error) {
    console.log(error);
  }
};
*/

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersSucceded(state, action) {
      state.push(...action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export const { fetchUsersSucceded } = usersSlice.actions;

export const getAllUsers = state => state.users;
export const getSingleUser = (state, userId) => state.users.find(user => user.id === userId);

export default usersSlice.reducer;
