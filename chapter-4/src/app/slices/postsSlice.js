import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  status: 'idle',
  posts: [],
  error: null,
};

export const fetchPosts = () => async dispatch => {
  dispatch(fetchPostsStarted());

  try {
    const response = await axios.get(POSTS_URL);
    let minute = 1;

    const posts = response.data.map(newPost => {
      newPost.date = sub(new Date(), { minutes: minute++ }).toISOString();
      newPost.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };

      return newPost;
    });

    dispatch(fetchPostsSucceded(posts));
  } catch (error) {
    dispatch(fetchPostsFailed(error.message));
  }
};

export const addNewPost = newPost => async dispatch => {
  const response = await axios.post(POSTS_URL, newPost);
  const post = response.data;

  post.id = nanoid();
  post.date = new Date().toISOString();
  post.reactions = {
    thumbsUp: 0,
    wow: 0,
    heart: 0,
    rocket: 0,
    coffee: 0,
  };

  dispatch(addPost(post));
};

// Redux actions and state should only contain plain JS values like objects, arrays and primitives. Don't put class
// instances and functions into Redux. That's why ISO string has been assigned to date field rather than instance of
// Date class

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
      state.posts.push(...action.payload);
    },

    fetchPostsFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    addPost(state, action) {
      state.posts.push(action.payload);
    },

    addReaction(state, action) {
      const { postId, reactionType } = action.payload;
      const newPost = state.posts.find(newPost => newPost.id === postId);

      if (newPost) {
        newPost.reactions[reactionType]++;
      }
    },
  },
});

export const {
  addPost,
  editPost,
  deletePost,
  addReaction,
  fetchPostsStarted,
  fetchPostsSucceded,
  fetchPostsFailed,
} = postsSlice.actions;

export const getAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;
export const getSinglePost = (state, postId) => state.posts.posts.find(post => post.id === postId);

export default postsSlice.reducer;
