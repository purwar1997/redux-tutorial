import { useSelector } from 'react-redux';
import { compareDesc, parseISO } from 'date-fns';
import { getAllPosts, getPostStatus, getPostError } from '../app/slices/postsSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
  const posts = useSelector(getAllPosts);
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);

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
