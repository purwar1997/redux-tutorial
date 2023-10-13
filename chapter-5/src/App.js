import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
import SinglePostPage from "./components/SinglePostPage";
import EditPostForm from "./components/EditPostForm";
import UsersList from "./components/UsersList";
import UserPage from "./components/UserPage";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PostsList />} />

          <Route path='post'>
            <Route index element={<AddPostForm />} />
            <Route path=':postId' element={<SinglePostPage />} />
            <Route path=':postId/edit' element={<EditPostForm />} />
          </Route>

          <Route path='users'>
            <Route index element={<UsersList />} />
            <Route path=':userId' element={<UserPage />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
