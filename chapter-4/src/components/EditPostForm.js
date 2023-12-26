import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost, getPostById } from '../app/slices/postsSlice';
import { getAllUsers } from '../app/slices/usersSlice';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector(state => getPostById(state, postId));
  const users = useSelector(getAllUsers);
  const dispatch = useDispatch();

  const [postTitle, setPostTitle] = useState(post?.title);
  const [postContent, setPostContent] = useState(post?.content);
  const [postAuthor, setPostAuthor] = useState(post?.user);
  const [requestStatus, setRequestStatus] = useState('idle');

  const canSave = [postTitle, postContent, postAuthor].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = async () => {
    try {
      setRequestStatus('pending');

      await dispatch(
        updatePost({
          id: postId,
          title: postTitle,
          content: postContent,
          user: postAuthor,
        })
      ).unwrap();

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setRequestStatus('idle');
    }
  };

  // All hooks must be above any conditional return statement

  if (!post) {
    return <h2 className='text-2xl'>Post not found!</h2>;
  }

  return (
    <section>
      <h2 className='text-2xl'>Edit post</h2>

      <form className='mt-8 space-y-4'>
        <div className='flex gap-4'>
          <label className='w-28' htmlFor='postTitle'>
            Post title
          </label>

          <input
            className='flex-1 border border-gray-500 px-4 py-2.5 rounded focus:outline-none'
            type='text'
            id='postTitle'
            value={postTitle}
            onChange={e => setPostTitle(e.target.value)}
          />
        </div>

        <div className='flex gap-4'>
          <label className='w-28' htmlFor='postContent'>
            Post content
          </label>

          <textarea
            className='flex-1 border border-gray-500 h-36 resize-none px-4 py-2.5 rounded focus:outline-none'
            id='postContent'
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
          />
        </div>

        <div className='flex gap-4'>
          <label className='w-28' htmlFor='postAuthor'>
            Post author
          </label>

          <select
            className='flex-1 border border-gray-500 px-3 py-2 rounded focus:outline-none'
            id='postAuthor'
            value={postAuthor}
            onChange={e => setPostAuthor(e.target.value)}
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className='ml-32 border border-gray-500 px-5 py-1.5 rounded'
          type='button'
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          {requestStatus === 'pending' ? 'Saving...' : 'Save'}
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
