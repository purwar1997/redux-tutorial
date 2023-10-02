import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
  const dateString = formatDistanceToNow(parseISO(timestamp));

  return <span>{dateString} ago</span>;
};

export default TimeAgo;
