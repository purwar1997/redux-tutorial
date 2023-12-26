import { Link, NavLink } from 'react-router-dom';

const Header = () => {
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
      </nav>
    </header>
  );
};

export default Header;
