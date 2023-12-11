import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export const getAllUsers = state => state.users;
export const getUserById = (state, userId) => state.users.find(user => user.id === userId);

export default usersSlice.reducer;
