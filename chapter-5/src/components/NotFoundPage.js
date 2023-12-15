import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='py-10 flex flex-col items-center'>
      <h2 className='text-5xl font-medium text-gray-600'>Page Not Found!</h2>
      <p className='mt-8 text-xl'>Sorry, we can't seem to find the page you were looking for.</p>
      <Link
        className='mt-10 bg-purple-600 text-white px-7 py-3 rounded-full transition hover:bg-purple-700'
        to='/'
      >
        Go to homepage
      </Link>
    </section>
  );
};

export default NotFoundPage;
