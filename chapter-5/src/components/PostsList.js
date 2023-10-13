import { useSelector } from 'react-redux';
import { compareDesc, parseISO } from 'date-fns';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
  const posts = useSelector(store => store.posts.posts);
  const status = useSelector(store => store.posts.status);
  const error = useSelector(store => store.posts.error);

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
