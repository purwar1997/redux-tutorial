import { useSelector } from 'react-redux';
import { compareDesc, parseISO } from 'date-fns';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
  const posts = useSelector(store => store.posts);

  const orderedPosts = posts
    .slice()
    .sort((postA, postB) => compareDesc(parseISO(postA.date), parseISO(postB.date)));

  return (
    <section className='mt-10'>
      <h2 className='text-2xl'>All posts</h2>

      <div className='mt-5 space-y-4'>
        {orderedPosts.map(post => (
          <article className='border border-gray-500 px-5 py-4 rounded-xl' key={post.id}>
            <h3 className='text-xl'>{post.title}</h3>
            <p className='mt-2.5'>{post.content}</p>
            <p className='mt-2.5'>
              <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostsList;
