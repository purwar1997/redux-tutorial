import { memo } from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostExcerpt = memo(({ post }) => {
  return (
    <Link className='block' to={`posts/${post.id}`}>
      <article className='border border-gray-500 p-5 rounded-xl space-y-3'>
        <h3 className='text-xl'>{post.title}</h3>
        <p>{post.content.substring(0, 100)}...</p>
        <p>
          - <PostAuthor authorId={post.user} />, <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    </Link>
  );
});

export default PostExcerpt;
