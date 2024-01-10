import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotifications, allNotificationsRead } from '../app/slices/notificationsSlice';
import { getAllUsers } from '../app/slices/usersSlice';
import TimeAgo from './TimeAgo';

const NotificationsList = () => {
  const notifications = useSelector(getAllNotifications);
  const users = useSelector(getAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allNotificationsRead());
  });

  const renderedNotifications = notifications.map(notification => {
    const user = users.find(user => user.id === notification.user) || { name: 'Unknown user' };

    return (
      <div
        className='border border-b-0 last:border-b px-5 py-3'
        style={{ backgroundColor: notification.isNew ? '#E8F5FE' : 'transparent' }}
        key={notification.id}
      >
        <p>
          <span className='font-medium'>{user.name}</span> {notification.message}
        </p>

        <TimeAgo timestamp={notification.date} />
      </div>
    );
  });

  return (
    <section>
      <h2 className='text-2xl'>Notifications</h2>

      <div className='mt-8'>{renderedNotifications}</div>
    </section>
  );
};

export default NotificationsList;
