import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Learning javascript',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ex sapiente doloremque consequatur architecto, laboriosam beatae non fugiat labore repudiandae, animi fugit sit saepe enim laborum numquam omnis temporibus veniam!',
    date: sub(new Date(), { minutes: 20 }).toISOString(),
  },
  {
    id: '2',
    title: 'Learning typescript',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ex sapiente doloremque consequatur architecto, laboriosam beatae non fugiat labore repudiandae, animi fugit sit saepe enim laborum numquam omnis temporibus veniam!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
];

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
            content,
            userId,
            date: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.push(action.payload);
      },
    },
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
