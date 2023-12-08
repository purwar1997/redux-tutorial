import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Javascript',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ex sapiente doloremque consequatur architecto, laboriosam beatae non fugiat labore repudiandae, animi fugit sit saepe enim laborum numquam omnis temporibus veniam!',
    userId: '3',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'Typescript for react',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem provident corporis deleniti deserunt, tempora accusantium. Neque dolores fuga impedit, voluptate soluta quia a. Ratione neque quasi nulla, inventore voluptate consequuntur?',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    userId: '1',
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      prepare(title, content, author) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId: author,
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
        state.push(action.payload);
      },
    },

    editPost(state, action) {
      const { postTitle, postContent, postAuthor, postId } = action.payload;

      const post = state.find(post => post.id === postId);
      const postIndex = state.findIndex(post => post.id === postId);

      if (post) {
        post.title = postTitle;
        post.content = postContent;
        post.userId = postAuthor;
        post.date = new Date().toISOString();

        state.splice(postIndex, 1, post);
      }
    },

    deletePost(state, action) {
      const post = state.find(post => post.id === action.payload);
      const postIndex = state.findIndex(post => post.id === action.payload);

      if (post) {
        state.splice(postIndex, 1);
      }
    },

    addReaction(state, action) {
      const { postId, reactionType } = action.payload;

      const post = state.find(post => post.id === postId);
      const postIndex = state.findIndex(post => post.id === postId);

      if (post) {
        post.reactions[reactionType]++;
        state.splice(postIndex, 1, post);
      }
    },
  },
});

export const { addPost, editPost, deletePost, addReaction } = postsSlice.actions;

export const getAllPosts = state => state.posts;
export const getSinglePost = (state, postId) => state.posts.find(post => post.id === postId);

export default postsSlice.reducer;
