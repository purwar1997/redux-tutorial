import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostsList from './components/PostsList';
import AddPostForm from './components/AddPostForm';
import SinglePostPage from './components/SinglePostPage';
import EditPostForm from './components/EditPostForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PostsList />} />
          <Route path='post' element={<AddPostForm />} />
          <Route path='post/:postId' element={<SinglePostPage />} />
          <Route path='post/:postId/edit' element={<EditPostForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
