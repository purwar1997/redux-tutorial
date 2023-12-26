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

  const onReactionButtonClicked = (event, reactionType) => {
    event.preventDefault();

    dispatch(addReaction({ postId: post.id, reactionType }));
  };

  return (
    <div className='flex gap-3'>
      {Object.entries(reactionEmojis).map(([emojiName, emojiSymbol]) => (
        <button
          className='flex gap-2 border border-gray-400 rounded px-2.5 py-0.5'
          key={emojiName}
          onClick={event => onReactionButtonClicked(event, emojiName)}
        >
          <span>{emojiSymbol}</span>
          <span>{post.reactions[emojiName]}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
