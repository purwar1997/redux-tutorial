import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  status: 'idle',
  posts: [],
  error: null,
};

// Redux actions and state should only contain plain JS values like objects, arrays and primitives. Don't put class
// instances and functions into Redux. That's why ISO string has been assigned to date field rather than instance of
// Date class.

// Handwritten thunk functions

/*
export const fetchPosts = () => async dispatch => {
  dispatch(fetchPostsStarted());

  try {
    const response = await axios.get(POSTS_URL);
    let minute = 1;

    const posts = response.data.map(post => {
      post.date = sub(new Date(), { minutes: minute++ }).toISOString();
      post.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };

      return post;
    });

    dispatch(fetchPostsSucceded(posts));
  } catch (error) {
    dispatch(fetchPostsFailed(error.message));
  }
};

export const addNewPost = newPost => async dispatch => {
  const response = await axios.post(POSTS_URL, newPost);
  const post = response.data;

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

export const updatePost = post => async dispatch => {
  const response = await axios.put(POSTS_URL, post);
  dispatch(editPost(response.data));
};

export const deletePost = postId => async dispatch => {
  await axios.delete(`${POSTS_URL}/${postId}`);
  dispatch(removePost(postId));
};
*/

// Thunks created using createAsyncThunk

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL);
  let minute = 1;

  const posts = response.data.map(post => {
    post.date = sub(new Date(), { minutes: minute++ }).toISOString();
    post.reactions = {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    };

    return post;
  });

  return posts;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async newPost => {
  const response = await axios.post(POSTS_URL, newPost);
  const post = response.data;

  post.date = new Date().toISOString();
  post.reactions = {
    thumbsUp: 0,
    wow: 0,
    heart: 0,
    rocket: 0,
    coffee: 0,
  };

  return post;
});

export const updatePost = createAsyncThunk('posts/editPost', async post => {
  try {
    const response = await axios.put(POSTS_URL, post);
    return response.data;
  } catch (error) {
    return post;
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async postId => {
  await axios.delete(`${POSTS_URL}/${postId}`);
  return postId;
});

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

    editPost(state, action) {
      const { id, title, body, userId } = action.payload;
      const post = state.posts.find(post => post.id === id);

      if (post) {
        post.title = title;
        post.body = body;
        post.userId = userId;
        post.date = new Date().toISOString();
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
      const newPost = state.posts.find(newPost => newPost.id === postId);

      if (newPost) {
        newPost.reactions[reactionType]++;
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
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, title, body, userId } = action.payload;
        const post = state.posts.find(post => post.id === id);

        if (post) {
          post.title = title;
          post.body = body;
          post.userId = userId;
          post.date = new Date().toISOString();
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload);

        if (post) {
          state.posts = state.posts.filter(post => post.id !== action.payload);
        }
      });
  },
});

export const {
  addPost,
  editPost,
  removePost,
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
