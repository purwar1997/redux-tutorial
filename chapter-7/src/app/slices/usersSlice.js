import { createSelector } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';

apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
});

const selectUsersResult = apiSlice.endpoints.getUsers.select();

export const getAllUsers = createSelector(
  [selectUsersResult],
  usersResult => usersResult?.data ?? []
);

export const getUserById = createSelector(
  [getAllUsers, (state, userId) => userId],
  (users, userId) => users.find(user => user.id === userId)
);

export const { useGetUsersQuery } = apiSlice;
