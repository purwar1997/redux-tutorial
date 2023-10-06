import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compareDesc, parseISO } from 'date-fns';
import { fetchPosts } from '../app/slices/postsSlice';
import PostExcerpt from './PostExcerpt';

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
    content = <p className='text-lg'>Loading...</p>;
  } else if (status === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((postA, postB) => compareDesc(parseISO(postA.date), parseISO(postB.date)));

    content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />);
  } else {
    content = <p className='text-lg'>{error}</p>;
  }

  return <section className='space-y-5'>{content}</section>;
};

export default PostsList;
