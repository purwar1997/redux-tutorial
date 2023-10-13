import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector(store => store.users.find(user => user.id === Number(userId)));

  const posts = useSelector(store =>
    store.posts.posts.filter(post => post.userId === Number(userId))
  );

  return (
    <section>
      <h2 className='text-2xl'>{user?.name}</h2>

      <ul className='mt-5 list-disc space-y-1'>
        {posts.map(post => (
          <li className='text-purple-700 hover:underline' key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserPage;
