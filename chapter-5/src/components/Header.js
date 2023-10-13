import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='px-24 py-7 flex justify-between items-center text-white bg-purple-800'>
      <h1 className='text-3xl'>Redux Blogs</h1>

      <nav className='space-x-10'>
        <Link to='/'>Home</Link>
        <Link to='post'>Post</Link>
        <Link to='users'>Users</Link>
      </nav>
    </header>
  );
};

export default Header;
