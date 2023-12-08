import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, getSinglePost } from '../app/slices/postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector(state => getSinglePost(state, postId));
  const dispatch = useDispatch();

  if (!post) {
    return <h2 className='text-2xl'>Post not found!</h2>;
  }

  const onDeletePostClicked = () => {
    const confirmToDelete = window.confirm('Are you sure you want to delete this post?');

    if (confirmToDelete) {
      dispatch(deletePost(postId));
      navigate('/', { replace: true });
    }
  };

  return (
    <section>
      <article className='border border-gray-500 p-5 rounded-xl space-y-3'>
        <h3 className='text-xl'>{post.title}</h3>
        <p>{post.content}</p>
        <p>
          - <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>

      <div className='mt-4 flex gap-3'>
        <button
          className='border border-gray-500 px-5 py-1.5 rounded'
          onClick={() => navigate('edit')}
        >
          Edit
        </button>

        <button
          className='border border-gray-500 px-5 py-1.5 rounded'
          onClick={onDeletePostClicked}
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default SinglePostPage;
