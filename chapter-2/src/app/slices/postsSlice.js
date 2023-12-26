import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Javascript',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ex sapiente doloremque consequatur architecto, laboriosam beatae non fugiat labore repudiandae, animi fugit sit saepe enim laborum numquam omnis temporibus veniam!',
    userId: '2',
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
    userId: '4',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
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

    addReaction(state, action) {
      const { postId, reactionType } = action.payload;
      const post = state.find(post => post.id === postId);

      if (post) {
        post.reactions[reactionType]++;
      }
    },
  },
});

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
