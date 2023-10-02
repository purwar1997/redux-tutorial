import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compareDesc, parseISO } from 'date-fns';
import { fetchPosts } from '../app/slices/postsSlice';
import Post from './Post';

const PostsList = () => {
  const posts = useSelector(store => store.posts.posts);
  const status = useSelector(store => store.posts.status);
  const error = useSelector(store => store.posts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((postA, postB) => compareDesc(parseISO(postA.date), parseISO(postB.date)));

    content = orderedPosts.map(post => <Post key={post.id} post={post} />);
  } else {
    content = <p>{error}</p>;
  }

  return (
    <section className='mt-10'>
      <h2 className='text-2xl'>Posts</h2>
      <div className='mt-6 space-y-4'>{content}</div>
    </section>
  );
};

export default PostsList;
