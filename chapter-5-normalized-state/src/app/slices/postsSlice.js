import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { compareDesc } from 'date-fns';
import { client } from '../../api/client';

const postsAdapter = createEntityAdapter({
  sortComparer: (postA, postB) => compareDesc(postA.date, postB.date),
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/api/posts');
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async newPost => {
  const response = await client.post('/api/posts', newPost);
  return response.data;
});

export const updatePost = createAsyncThunk('posts/editPost', async post => {
  const response = await client.put(`/api/posts/${post.id}`, post);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async postId => {
  const response = await client.delete(`/api/posts/${postId}`);
  return response.data.id;
});

// When using Immer, you can either mutate an existing state object, or return a new state value yourself, but not
// both at the same time

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addReaction(state, action) {
      const { postId, reactionType } = action.payload;
      const post = state.entities[postId];

      if (post) {
        post.reactions[reactionType]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeded';
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(updatePost.fulfilled, (state, action) => {
        const post = state.entities[action.payload.id];

        if (post) {
          postsAdapter.updateOne(state, { id: action.payload.id, changes: action.payload });
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const post = state.entities[action.payload];

        if (post) {
          postsAdapter.removeOne(state, action.payload);
        }
      });
  },
});

export const { addReaction } = postsSlice.actions;

export const {
  selectAll: getAllPosts,
  selectById: getPostById,
  selectIds: getPostsIds,
} = postsAdapter.getSelectors(state => state.posts);

export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export const getPostsByUser = createSelector(
  [getAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);

export default postsSlice.reducer;
