import { createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = [];

export const fetchUsers = () => async dispatch => {
  const response = await client.get('/api/users');
  dispatch(fetchUsersSucceded(response.data));
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
