import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostExcerpt = ({ post }) => {
  return (
    <article className='border border-gray-500 px-5 py-4 rounded-xl'>
      <h2 className='text-xl'>{post.title}</h2>

      <p className='mt-2.5'>
        {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
      </p>

      <Link className='inline-block mt-2.5 underline' to={`post/${post.id}`}>
        View post
      </Link>

      <p className='mt-2.5'>
        <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
      </p>

      <ReactionButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
