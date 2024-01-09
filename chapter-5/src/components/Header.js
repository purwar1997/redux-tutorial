import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchNotifications } from '../app/slices/notificationsSlice';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className='h-20 px-24 flex justify-between items-center bg-purple-600'>
      <Link to='.'>
        <h1 className='text-3xl font-medium text-white'>Redux</h1>
      </Link>

      <nav className='space-x-10 text-white'>
        <NavLink
          className='underline-offset-4 hover:underline'
          style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}
          to='.'
        >
          Posts
        </NavLink>

        <NavLink
          className='underline-offset-4 hover:underline'
          style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}
          to='posts/add'
        >
          Add Post
        </NavLink>

        <NavLink
          className='underline-offset-4 hover:underline'
          style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}
          to='users'
        >
          Users
        </NavLink>

        <NavLink
          className='underline-offset-4 hover:underline'
          style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}
          to='notifications'
        >
          Notifications
        </NavLink>
      </nav>

      <button
        className='px-5 py-2 bg-blue-500 text-white font-medium rounded-md'
        onClick={() => dispatch(fetchNotifications())}
      >
        Refresh Notifications
      </button>
    </header>
  );
};

export default Header;
