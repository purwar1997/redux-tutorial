import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
  const timeAgo = formatDistanceToNow(parseISO(timestamp), {
    addSuffix: true,
  });

  return <span className='italic'>{timeAgo}</span>;
};

export default TimeAgo;
