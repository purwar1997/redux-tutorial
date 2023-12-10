import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section className='py-10 flex flex-col items-center gap-8'>
      <h2 className='text-5xl font-medium text-gray-600'>Oops!</h2>
      <h3 className='text-xl'>Sorry, an unexpected error has occurred.</h3>
      <p>{error.message}</p>
    </section>
  );
};

export default ErrorPage;
