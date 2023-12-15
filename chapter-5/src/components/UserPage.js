import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPostsByUser } from '../app/slices/postsSlice';
import { getUserById } from '../app/slices/usersSlice';

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector(state => getUserById(state, Number(userId)));
  const posts = useSelector(state => getPostsByUser(state, Number(userId)));

  return (
    <section>
      <h2 className='text-2xl'>{user.name}</h2>

      <ul className='mt-8 space-y-3 list-disc'>
        {posts.map(post => (
          <li key={post.id}>
            <Link className='underline-offset-2 hover:underline' to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserPage;
