import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { compareDesc, parseISO } from 'date-fns';
import { getAllPosts, fetchPosts, getPostsStatus, getPostsError } from '../app/slices/postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
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
    const postsOrderedByDate = posts
      .slice()
      .sort((postOne, postTwo) => compareDesc(parseISO(postOne.date), parseISO(postTwo.date)));

    contentToRender = (
      <>
        <h2 className='text-2xl'>{posts.length > 0 ? 'All posts' : 'No post found'}</h2>

        <div className='mt-6 space-y-3'>
          {postsOrderedByDate.map(post => (
            <Link className='block' to={`posts/${post.id}`} key={post.id}>
              <article className='border border-gray-500 p-5 rounded-xl space-y-3'>
                <h3 className='text-xl'>{post.title}</h3>
                <p>{post.body.substring(0, 100)}...</p>
                <p>
                  - <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
              </article>
            </Link>
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
