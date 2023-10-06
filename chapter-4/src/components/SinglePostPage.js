import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector(store => store.posts.posts.find(post => post.id === Number(postId)));

  if (!post) {
    return (
      <section>
        <h2 className='text-lg'>No post found</h2>
      </section>
    );
  }

  return (
    <section>
      <article className='border border-gray-500 px-5 py-4 rounded-xl'>
        <h3 className='text-xl'>{post.title}</h3>
        <p className='mt-2.5'>{post.body}</p>
        <p className='mt-2.5'>
          <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>

      <Link to='edit'>Edit</Link>
    </section>
  );
};

export default SinglePostPage;
