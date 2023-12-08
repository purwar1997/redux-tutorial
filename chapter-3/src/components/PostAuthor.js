import { useSelector } from 'react-redux';

const PostAuthor = ({ authorId }) => {
  const users = useSelector(store => store.users);

  const postAuthor = users.find(user => user.id === authorId);

  return <span>{postAuthor ? postAuthor.name : 'Unknown author'}</span>;
};

export default PostAuthor;
