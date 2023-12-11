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
    <div className='flex gap-5'>
      {Object.entries(reactionEmojis).map(([emojiName, emojiSymbol]) => (
        <button
          className='flex gap-2'
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
