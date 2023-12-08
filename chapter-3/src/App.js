import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import PostsList from './components/PostsList';
import SinglePostPage from './components/SinglePostPage';
import AddPostForm from './components/AddPostForm';
import EditPostForm from './components/EditPostForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<PostsList />} />
      <Route path='posts'>
        <Route path='add' element={<AddPostForm />} />
        <Route path=':postId' element={<SinglePostPage />} />
        <Route path=':postId/edit' element={<EditPostForm />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
