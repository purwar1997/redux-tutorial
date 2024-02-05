import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => [
        { type: 'Post', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Post', id })),
      ],
      keepUnusedDataFor: 120,
    }),
    getPost: builder.query({
      query: postId => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    addNewPost: builder.mutation({
      query: newPost => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation({
      query: ({ postId, updates }) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.postId }],
    }),
    deletePost: builder.mutation({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `/posts/${postId}/reactions`,
        method: 'PUT',
        body: { reaction },
      }),
      onQueryStarted: async ({ postId, reaction }, { dispatch, queryFulfilled }) => {
        const patchResultForAllPosts = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, posts => {
            const post = posts.find(post => post.id === postId);

            if (post) {
              post.reactions[reaction]++;
            }
          })
        );

        const pathResultForSinglePost = dispatch(
          apiSlice.util.updateQueryData('getPost', postId, post => {
            post.reactions[reaction]++;
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResultForAllPosts.undo();
          pathResultForSinglePost.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation,
} = apiSlice;

export default apiSlice;
