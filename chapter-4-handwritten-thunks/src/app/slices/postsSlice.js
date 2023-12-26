import { createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
  status: 'idle',
  posts: [],
  error: null,
};

export const fetchPosts = () => async dispatch => {
  dispatch(fetchPostsStarted());

  try {
    const response = await client.get('/api/posts');
    dispatch(fetchPostsSucceded(response.data));
  } catch (error) {
    dispatch(fetchPostsFailed(error.message));
  }
};

export const addNewPost = newPost => async dispatch => {
  const response = await client.post('/api/posts', newPost);
  dispatch(addPost(response.data));
};

export const updatePost = post => async dispatch => {
  const response = await client.put(`/api/posts/${post.id}`, post);
  dispatch(editPost(response.data));
};

export const deletePost = postId => async dispatch => {
  const response = await client.delete(`/api/posts/${postId}`);
  dispatch(removePost(response.data.id));
};

// When using Immer, you can either mutate an existing state object, or return a new state value yourself, but not
// both at the same time

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStarted(state) {
      state.status = 'loading';
    },

    fetchPostsSucceded(state, action) {
      state.status = 'succeded';
      state.posts = state.posts.concat(action.payload);
    },

    fetchPostsFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    addPost(state, action) {
      state.posts.push(action.payload);
    },

    editPost(state, action) {
      const post = state.posts.find(post => post.id === action.payload.id);

      if (post) {
        state.posts = state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        );
      }
    },

    removePost(state, action) {
      const post = state.posts.find(post => post.id === action.payload);

      if (post) {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      }
    },

    addReaction(state, action) {
      const { postId, reactionType } = action.payload;
      const post = state.posts.find(post => post.id === postId);

      if (post) {
        post.reactions[reactionType]++;
      }
    },
  },
});

export const {
  fetchPostsStarted,
  fetchPostsSucceded,
  fetchPostsFailed,
  addPost,
  editPost,
  removePost,
  addReaction,
} = postsSlice.actions;

export const getAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;
export const getPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export default postsSlice.reducer;
