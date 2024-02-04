import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
      keepUnusedDataFor: 120,
    }),
    getPost: builder.query({
      query: postId => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation({
      query: newPost => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ postId, updates }) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deletePost: builder.mutation({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;

export default apiSlice;
