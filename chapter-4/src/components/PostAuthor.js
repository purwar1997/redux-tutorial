import { useSelector } from 'react-redux';
import { getSingleUser } from '../app/slices/usersSlice';

const PostAuthor = ({ authorId }) => {
  const postAuthor = useSelector(state => getSingleUser(state, authorId));

  return <span>{postAuthor ? postAuthor.name : 'Unknown author'}</span>;
};

export default PostAuthor;
