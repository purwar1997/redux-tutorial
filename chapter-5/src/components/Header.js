import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-20 px-24 flex justify-between items-center bg-purple-600 text-white'>
      <Link to='.'>
        <h1 className='text-3xl font-medium'>Redux</h1>
      </Link>

      <nav className='space-x-10'>
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
      </nav>
    </header>
  );
};

export default Header;
