import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compareDesc } from 'date-fns';
import { getAllPosts, fetchPosts, getPostsStatus, getPostsError } from '../app/slices/postsSlice';
import PostExcerpt from './PostExcerpt';
import Spinner from './Spinner';

const PostsList = () => {
  const posts = useSelector(getAllPosts);
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
    const postsOrderedByDate = posts.toSorted((postOne, postTwo) =>
      compareDesc(postOne.date, postTwo.date)
    );

    contentToRender = (
      <>
        <h2 className='text-2xl'>{posts.length > 0 ? 'All posts' : 'No post found'}</h2>

        <div className='mt-6 space-y-3'>
          {postsOrderedByDate.map(post => (
            <PostExcerpt key={post.id} post={post} />
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
