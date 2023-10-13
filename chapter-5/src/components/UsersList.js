import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../app/slices/usersSlice";

const UsersList = () => {
  const users = useSelector(getAllUsers);

  return (
    <section>
      <h2 className='text-2xl'>Users</h2>

      <ul className='mt-5 list-disc space-y-1'>
        {users.map(user => (
          <li key={user.id}>
            <Link className='text-purple-700 hover:underline' to={`/users/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersList;
