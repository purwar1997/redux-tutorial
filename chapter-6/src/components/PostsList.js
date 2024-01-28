import { useMemo } from 'react';
import { compareDesc } from 'date-fns';
import { useGetPostsQuery } from '../app/slices/apiSlice';
import PostExcerpt from './PostExcerpt';
import Spinner from './Spinner';

const PostsList = () => {
  const { data: posts = [], isFetching, isSuccess, isError, error, refetch } = useGetPostsQuery();

  const postsOrderedByDate = useMemo(
    () => posts.toSorted((postA, postB) => compareDesc(postA.date, postB.date)),
    [posts]
  );

  let contentToRender;

  if (isFetching) {
    contentToRender = <Spinner text='Loading posts...' />;
  } else if (isSuccess) {
    contentToRender = (
      <>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl'>{posts.length > 0 ? 'All posts' : 'No post found'}</h2>
          <button
            className='bg-purple-500 text-white font-medium px-4 py-2 rounded'
            onClick={refetch}
          >
            Refetch Posts
          </button>
        </div>

        <div className='mt-6 space-y-3'>
          {postsOrderedByDate.map(post => (
            <PostExcerpt key={post.id} post={post} />
          ))}
        </div>
      </>
    );
  } else if (isError) {
    contentToRender = <h2 className='text-2xl'>{error.toString()}</h2>;
  }

  return <section>{contentToRender}</section>;
};

export default PostsList;
