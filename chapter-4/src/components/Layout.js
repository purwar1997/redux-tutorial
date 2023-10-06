import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className='px-24 py-12'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
