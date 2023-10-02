import { useDispatch } from 'react-redux';
import { addReaction } from '../app/slices/postsSlice';

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionEmojis = {
    thumbsUp: '👍',
    wow: '🙂',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
  };

  return (
    <div className='mt-4 flex gap-5'>
      {Object.entries(reactionEmojis).map(([emojiName, emojiSymbol]) => (
        <button
          key={emojiName}
          className='flex gap-1.5'
          onClick={() => dispatch(addReaction({ postId: post.id, reaction: emojiName }))}
        >
          <span>{emojiSymbol}</span>
          <span>{post.reactions[emojiName]}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
