import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts/';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async post => {
  const response = await axios.post(POSTS_URL, post);
  return response.data;
});

export const editPost = createAsyncThunk('posts/editPost', async post => {
  const response = await axios.put(POSTS_URL + post.id, post);
  return response.data;
});

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
      reducer(state, action) {
        state.posts.push(action.payload);
      },
    },

    addReaction(state, action) {
      const { postId, reaction } = action.payload;

      const post = state.posts.find(post => post.id === postId);

      if (post) {
        post.reactions[reaction]++;
      }
    },

    editPost(state, action) {
      const { postId, title, content, userId } = action.payload;

      const post = state.posts.find(post => post.id === postId);

      post.title = title;
      post.body = content;
      post.userId = Number(userId);
      post.date = new Date().toISOString;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        let minute = 1;

        const loadedPosts = action.payload.map(post => {
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

        state.status = 'succeeded';
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const post = action.payload;

        post.date = new Date().toISOString();
        post.userId = Number(post.userId);
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        state.posts.push(post);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const { id, title, body, userId } = action.payload;

        const post = state.posts.find(post => post.id === id);

        post.title = title;
        post.body = body;
        post.userId = userId;
        post.date = new Date().toISOString();
      });
  },
});

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
