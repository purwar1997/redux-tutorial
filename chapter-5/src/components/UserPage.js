import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../app/slices/usersSlice";
import { getPostsByUser } from "../app/slices/postsSlice";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector(store => getUserById(store, Number(userId)));
  const posts = useSelector(store => getPostsByUser(store, Number(userId)));

  return (
    <section>
      <h2 className='text-2xl'>{user?.name}</h2>

      <ul className='mt-5 list-disc space-y-1'>
        {posts.map(post => (
          <li key={post.id}>
            <Link className='text-purple-700 hover:underline' to={`/post/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserPage;
