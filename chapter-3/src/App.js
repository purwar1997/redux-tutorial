import PostsList from './components/PostsList';
import AddPostForm from './components/AddPostForm';

const App = () => {
  return (
    <main className='px-20 py-10'>
      <AddPostForm />
      <PostsList />
    </main>
  );
};

export default App;
