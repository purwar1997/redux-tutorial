import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useGetPostsQuery } from '../app/slices/apiSlice';
import { getUserById } from '../app/slices/usersSlice';
import Spinner from './Spinner';

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector(state => getUserById(state, userId));

  const getPostsByUser = createSelector(
    [result => result.data, (result, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
  );

  const { postsByUser, isFetching } = useGetPostsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      postsByUser: getPostsByUser(result, userId),
    }),
  });

  if (isFetching) {
    return <Spinner text='Loading posts...' />;
  }

  return (
    <section>
      <h2 className='text-2xl'>{user.name}</h2>

      <ul className='mt-8 space-y-3 list-disc'>
        {postsByUser.map(post => (
          <li key={post.id}>
            <Link
              className='text-purple-600 underline-offset-2 hover:underline'
              to={`/posts/${post.id}`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserPage;
