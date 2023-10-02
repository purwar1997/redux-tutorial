import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const Post = ({ post }) => {
  return (
    <article className='border border-gray-500 px-5 py-4 rounded-xl'>
      <h3 className='text-xl'>{post.title}</h3>
      <p className='mt-2.5'>{post.body}</p>
      <p className='mt-2.5'>
        <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default Post;
