import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../app/slices/postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const savePost = () => {
    dispatch(addPost(title, content));
    setTitle('');
    setContent('');
  };

  return (
    <section>
      <h2 className='text-2xl'>Add post</h2>

      <form className='mt-6 flex flex-col items-start gap-4'>
        <input
          className='border border-gray-500 w-full px-4 py-2.5 rounded placeholder:text-gray-500 focus:outline-none'
          type='text'
          name='postTitle'
          placeholder='Add post title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className='border border-gray-500 w-full h-40 px-4 py-2.5 rounded placeholder:text-gray-500 focus:outline-none'
          name='postContent'
          placeholder='Add post content'
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <button
          className='border border-gray-500 px-5 py-1.5 rounded'
          type='button'
          onClick={savePost}
          disabled={title.trim() === '' || content.trim() === ''}
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
