import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsIds, fetchPosts, getPostsStatus, getPostsError } from '../app/slices/postsSlice';
import PostExcerpt from './PostExcerpt';
import Spinner from './Spinner';

const PostsList = () => {
  const postsIds = useSelector(getPostsIds);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let contentToRender;

  if (status === 'loading') {
    contentToRender = <Spinner text='Loading posts...' />;
  } else if (status === 'succeded') {
    contentToRender = (
      <>
        <h2 className='text-2xl'>{postsIds.length > 0 ? 'All posts' : 'No post found'}</h2>

        <div className='mt-6 space-y-3'>
          {postsIds.map(postId => (
            <PostExcerpt key={postId} postId={postId} />
          ))}
        </div>
      </>
    );
  } else if (status === 'failed') {
    contentToRender = <h2 className='text-2xl'>{error}</h2>;
  }

  return <section>{contentToRender}</section>;
};

export default PostsList;
