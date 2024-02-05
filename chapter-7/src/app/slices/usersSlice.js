import { createSelector } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
});

const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

export const getAllUsers = createSelector(
  [selectUsersResult],
  usersResult => usersResult?.data ?? []
);

export const getUserById = createSelector(
  [getAllUsers, (state, userId) => userId],
  (users, userId) => users.find(user => user.id === userId)
);

export const { useGetUsersQuery } = extendedApiSlice;
