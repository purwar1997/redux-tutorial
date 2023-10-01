import { useSelector } from 'react-redux';

const PostsList = () => {
  const posts = useSelector(store => store.posts);

  return (
    <section className='mt-10'>
      <h2 className='text-2xl'>All posts</h2>

      <div className='mt-6 space-y-4'>
        {posts.toReversed().map(post => (
          <article className='border border-gray-500 px-5 py-4 rounded-xl' key={post.id}>
            <h3 className='text-xl'>{post.title}</h3>
            <p className='mt-2'>{post.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostsList;
