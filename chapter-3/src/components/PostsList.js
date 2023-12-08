import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { compareDesc, parseISO } from 'date-fns';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
  const posts = useSelector(store => store.posts);

  const postsOrderedByDate = posts
    .slice()
    .sort((postOne, postTwo) => compareDesc(parseISO(postOne.date), parseISO(postTwo.date)));

  return (
    <section className=''>
      <h2 className='text-2xl'>{posts.length > 0 ? 'All posts' : 'No post found'}</h2>

      <div className='mt-6 space-y-3'>
        {postsOrderedByDate.map(post => (
          <Link className='block' to={`posts/${post.id}`} key={post.id}>
            <article className='border border-gray-500 p-5 rounded-xl space-y-3'>
              <h3 className='text-xl'>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <p>
                - <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
              </p>
              <ReactionButtons post={post} />
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PostsList;
