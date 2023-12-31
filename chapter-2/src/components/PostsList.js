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
    <section className='mt-10'>
      <h2 className='text-2xl'>All posts</h2>

      <div className='mt-6 space-y-3'>
        {postsOrderedByDate.map(post => (
          <article className='border border-gray-500 p-5 rounded-xl space-y-3' key={post.id}>
            <h3 className='text-xl'>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              - <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostsList;
