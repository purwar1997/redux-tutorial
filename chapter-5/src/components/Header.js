import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { increaseCount, getPostCount } from "../app/slices/postsSlice";

const Header = () => {
  const count = useSelector(getPostCount);
  const dispatch = useDispatch();

  return (
    <header className='px-24 py-7 flex justify-between items-center text-white bg-purple-800'>
      <Link to='/'>
        <h1 className='text-3xl'>Redux Blogs</h1>
      </Link>

      <nav className='space-x-10'>
        <Link to='/'>Home</Link>
        <Link to='post'>Post</Link>
        <Link to='users'>Users</Link>
      </nav>

      <button
        className='bg-white text-black font-medium w-16 py-0.5 rounded'
        onClick={() => dispatch(increaseCount())}
      >
        {count}
      </button>
    </header>
  );
};

export default Header;
