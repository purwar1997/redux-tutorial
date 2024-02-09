import { useAddReactionMutation } from '../app/slices/apiSlice';

const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();

  const reactionEmojis = {
    thumbsUp: '👍',
    wow: '🙂',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
  };

  const onReactionButtonClicked = async (event, reactionType) => {
    event.preventDefault();

    await addReaction({ postId: post.id, reaction: reactionType }).unwrap();
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
