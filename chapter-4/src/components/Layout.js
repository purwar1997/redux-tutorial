import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className='px-32 py-10'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
