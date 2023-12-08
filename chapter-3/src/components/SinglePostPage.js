import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
  const posts = useSelector(state => state.posts);
  const { postId } = useParams();

  const post = posts.find(post => post.id === postId);

  if (!post) {
    return <h2 className='text-2xl'>Post not found!</h2>;
  }

  return (
    <section>
      <article className='border border-gray-500 p-5 rounded-xl space-y-3'>
        <h3 className='text-xl'>{post.title}</h3>
        <p>{post.content}</p>
        <p>
          - <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    </section>
  );
};

export default SinglePostPage;
