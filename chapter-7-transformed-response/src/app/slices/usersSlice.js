import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';

const usersAdapater = createEntityAdapter();

const initialState = usersAdapater.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: responseData => {
        return usersAdapater.setAll(initialState, responseData);
      },
    }),
  }),
});

const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  [selectUsersResult],
  usersResult => usersResult?.data ?? initialState
);

export const { selectAll: getAllUsers, selectById: getUserById } =
  usersAdapater.getSelectors(selectUsersData);

export const { useGetUsersQuery } = extendedApiSlice;
