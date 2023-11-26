import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../app/slices/postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(null);

  const users = useSelector(store => store.users);
  const dispatch = useDispatch();

  const canSave = Boolean(title.trim()) && Boolean(content.trim()) && Boolean(userId);

  const savePost = () => {

    dispatch(addPost(title, content, userId));
    setTitle('');
    setContent('');
    setUserId(null);
  };

  return (
    <section>
      <h2 className='text-2xl'>Add post</h2>

      <form className='mt-6 space-y-4'>
        <div className='flex gap-6'>
          <label className='w-24' htmlFor='postTitle'>
            Post title
          </label>

          <input
            className='flex-1 border border-gray-500 px-4 py-2.5 rounded focus:outline-none'
            type='text'
            id='postTitle'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className='flex gap-6'>
          <label className='w-24' htmlFor='postContent'>
            Post content
          </label>

          <textarea
            className='flex-1 border border-gray-500 h-40 px-4 py-2.5 rounded focus:outline-none'
            id='postContent'
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div className='flex gap-6'>
          <label className='w-24' htmlFor='postAuthor'>
            Post author
          </label>

          <select
            className='flex-1 border border-gray-500 px-3 py-2 rounded focus:outline-none'
            id='postAuthor'
            onChange={e => setUserId(e.target.value)}
          >
            <option value='' disabled hidden selected={userId === null}>
              -- Please choose an option --
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className='ml-[120px] border border-gray-500 px-5 py-1.5 rounded'
          type='button'
          onClick={savePost}
          disabled={!canSave}
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
