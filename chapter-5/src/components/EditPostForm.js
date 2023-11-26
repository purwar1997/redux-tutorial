import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, getPostById } from "../app/slices/postsSlice";
import { getAllUsers } from "../app/slices/usersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector(store => getPostById(store, Number(postId)));
  const users = useSelector(getAllUsers);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  useEffect(() => {
    if (post && users.length > 0) {
      setTitle(post.title);
      setContent(post.body);
      setUserId(post.userId);
    }
  }, [post, users]);

  const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle";

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  const onSavePostClicked = async () => {
    try {
      setRequestStatus("pending");

      await dispatch(
        updatePost({ id: Number(postId), title, body: content, userId: Number(userId) })
      ).unwrap();

      setTitle("");
      setContent("");
      setUserId("");

      navigate(`/post/${postId}`, { replace: true });
    } catch (error) {
      console.log("Failure updating post", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <h2 className='text-2xl'>Edit post</h2>

      <form className='mt-8 space-y-4'>
        <div className='flex gap-3'>
          <label className='w-28' htmlFor='postTitle'>
            Post title
          </label>

          <input
            className='border border-gray-500 px-4 py-2.5 rounded flex-1 focus:outline-none'
            type='text'
            id='postTitle'
            value={title || ""}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className='flex gap-3'>
          <label className='w-28' htmlFor='postContent'>
            Post content
          </label>

          <textarea
            className='border border-gray-500 px-4 py-2.5 rounded flex-1 h-32 focus:outline-none'
            id='postContent'
            value={content || ""}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div className='flex gap-3'>
          <label className='w-28' htmlFor='postAuthor'>
            Post author
          </label>

          <select
            className='border border-gray-500 px-3 py-2.5 rounded flex-1 focus:outline-none'
            id='postAuthor'
            defaultValue={userId || ""}
            onChange={e => setUserId(e.target.value)}
          >
            <option value='' disabled hidden>
              -- Select an option --
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className='ml-[125px] flex gap-3'>
          <button
            className='w-20 border border-gray-500 rounded py-1.5'
            type='button'
            disabled={!canSave}
            onClick={onSavePostClicked}
          >
            Save
          </button>

          <button
            className='w-20 border border-gray-500 rounded py-1.5'
            type='button'
            onClick={() => navigate("..", { relative: "path" })}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;