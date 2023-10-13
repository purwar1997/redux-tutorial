import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getPostById } from "../app/slices/postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const [requestStatus, setRequestStatus] = useState("idle");

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector(store => getPostById(store, Number(postId)));
  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2 className='text-lg'>Post not found</h2>
      </section>
    );
  }

  const onDeletePostClicked = async () => {
    try {
      setRequestStatus("pending");
      await dispatch(deletePost(Number(postId))).unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Failure deleting post", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <article className='border border-gray-500 px-5 py-4 rounded-xl'>
        <h3 className='text-xl'>{post.title}</h3>
        <p className='mt-2.5'>{post.body}</p>
        <p className='mt-2.5'>
          <PostAuthor authorId={post.userId} />, <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>

      <div className='mt-4 flex gap-3'>
        <button
          className='w-20 border border-gray-500 rounded py-1.5'
          onClick={() => navigate("edit")}
        >
          Edit
        </button>

        <button
          className='w-20 border border-gray-500 rounded py-1.5'
          onClick={onDeletePostClicked}
          disabled={requestStatus !== "idle"}
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default SinglePostPage;
