import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(store => store.users);

  return (
    <section>
      <h2 className='text-2xl'>Users</h2>

      <ul className='mt-5 list-disc space-y-1'>
        {users.map(user => (
          <li className='text-purple-700 hover:underline' key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersList;
