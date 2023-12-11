import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];

export const fetchUsers = () => async dispatch => {
  try {
    const response = await axios.get(USERS_URL);
    dispatch(fetchUsersSucceded(response.data));
  } catch (error) {
    console.log(error);
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersSucceded(state, action) {
      state.push(...action.payload);
    },
  },
});

export const { fetchUsersSucceded } = usersSlice.actions;

export const getAllUsers = state => state.users;
export const getUserById = (state, userId) => state.users.find(user => user.id === userId);

export default usersSlice.reducer;
