import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from '../app/slices/postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [requestStatus, setRequestStatus] = useState('idle');

  const users = useSelector(store => store.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = async () => {
    try {
      // unwrap() returns a promise after an async operation has succeeded or failed
      setRequestStatus('pending');

      const post = await dispatch(addNewPost({ title, body: content, userId })).unwrap();

      setTitle('');
      setContent('');
      setUserId('');

      navigate(`/post/${post.id}`);
    } catch (error) {
      console.log('Failure adding post', error);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <section>
      <h2 className='text-2xl'>Add post</h2>

      <form className='mt-8 space-y-4'>
        <div className='flex gap-3'>
          <label className='w-28' htmlFor='postTitle'>
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

        <div className='flex gap-3'>
          <label className='w-28' htmlFor='postContent'>
            Post content
          </label>

          <textarea
            className='flex-1 border border-gray-500 h-32 px-4 py-2.5 rounded focus:outline-none'
            id='postContent'
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div className='flex gap-3'>
          <label className='w-28' htmlFor='postAuthor'>
            Post author
          </label>

          <select
            className='flex-1 border border-gray-500 px-3 py-2.5 rounded focus:outline-none cursor-pointer'
            id='postAuthor'
            defaultValue=''
            onChange={e => setUserId(e.target.value)}
          >
            <option value='' disabled hidden />

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className='ml-[125px] flex gap-3'>
          <button
            className='w-20 border border-gray-500 rounded py-1.5'
            type='button'
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save
          </button>

          <button
            className='w-20 border border-gray-500 rounded py-1.5'
            type='button'
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
