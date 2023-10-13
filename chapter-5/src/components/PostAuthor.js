import { useSelector } from "react-redux";
import { getUserById } from "../app/slices/usersSlice";

const PostAuthor = ({ authorId }) => {
  const postAuthor = useSelector(store => getUserById(store, authorId));

  return <span>- {postAuthor ? postAuthor.name : "Unknown author"}</span>;
};

export default PostAuthor;
