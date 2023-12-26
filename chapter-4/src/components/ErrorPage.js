import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section className='py-10 flex flex-col items-center'>
      <h2 className='text-5xl font-medium text-gray-600'>Oops!</h2>
      <h3 className='mt-8 text-xl'>Sorry, an unexpected error has occurred.</h3>
      <p className='mt-6'>{error.message}</p>
    </section>
  );
};

export default ErrorPage;
