import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className='text-center'>
      <h2 className='text-2xl'>Sorry, the page you were looking for was not found.</h2>

      <Link className='inline-block mt-7 bg-purple-700 text-white px-5 py-1.5 rounded' to={-1}>
        Go back
      </Link>
    </section>
  );
};

export default NotFoundPage;
