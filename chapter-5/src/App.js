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
import UsersList from './components/UsersList';
import UserPage from './components/UserPage';
import ErrorPage from './components/ErrorPage';
import NotFoundPage from './components/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<PostsList />} />

      <Route path='posts'>
        <Route path='add' element={<AddPostForm />} />
        <Route path=':postId' element={<SinglePostPage />} />
        <Route path=':postId/edit' element={<EditPostForm />} />
      </Route>

      <Route path='users'>
        <Route index element={<UsersList />} />
        <Route path=':userId' element={<UserPage />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
