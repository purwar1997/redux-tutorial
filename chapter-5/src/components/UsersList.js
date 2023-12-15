import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../app/slices/usersSlice';

const UsersList = () => {
  const users = useSelector(getAllUsers);

  return (
    <section>
      <h2 className='text-2xl'>Users</h2>

      <ul className='mt-8 space-y-3 list-disc'>
        {users.map(user => (
          <li key={user.id}>
            <Link className='underline-offset-2 hover:underline' to={`${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersList;
