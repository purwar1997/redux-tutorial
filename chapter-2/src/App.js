import AddPostForm from './components/AddPostForm';
import PostsList from './components/PostsList';

const App = () => {
  return (
    <main className='px-32 py-10'>
      <AddPostForm />
      <PostsList />
    </main>
  );
};

export default App;
