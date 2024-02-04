import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostQuery, useDeletePostMutation } from '../app/slices/apiSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import Spinner from './Spinner';

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data: post, isFetching, refetch } = useGetPostQuery(postId);
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const onDeletePostClicked = async () => {
    const confirmToDelete = window.confirm('Are you sure you want to delete this post?');

    if (confirmToDelete) {
      try {
        await deletePost(postId).unwrap();
        navigate('/', { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isFetching) {
    return <Spinner text='Loading post...' />;
  }

  if (!post) {
    return <h2 className='text-2xl'>Post not found!</h2>;
  }

  return (
    <section>
      <article className='border border-gray-500 p-5 rounded-xl space-y-3'>
        <h3 className='text-2xl'>{post.title}</h3>
        <p>{post.content}</p>
        <p>
          - <PostAuthor authorId={post.user} />, <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>

      <div className='mt-4 flex justify-between'>
        <div className='flex gap-3'>
          <button
            className='border border-gray-500 px-5 py-1.5 rounded'
            onClick={() => navigate('edit')}
          >
            Edit
          </button>

          <button
            className='border border-gray-500 px-5 py-1.5 rounded'
            onClick={onDeletePostClicked}
            disabled={isLoading}
          >
            Delete
          </button>
        </div>

        <button className='border border-gray-500 px-5 py-1.5 rounded' onClick={refetch}>
          Refetch Post
        </button>
      </div>
    </section>
  );
};

export default SinglePostPage;
