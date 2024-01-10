import { useSelector } from 'react-redux';
import { getAllNotifications } from '../app/slices/notificationsSlice';
import { getAllUsers } from '../app/slices/usersSlice';
import TimeAgo from './TimeAgo';

const NotificationsList = () => {
  const notifications = useSelector(getAllNotifications);
  const users = useSelector(getAllUsers);

  const renderedNotifications = notifications.map(notification => {
    const user = users.find(user => user.id === notification.user) || { name: 'Unknown user' };

    return (
      <div key={notification.id}>
        <p>
          <span>{user.name}</span> {notification.message}
        </p>

        <TimeAgo timestamp={notification.date} />
      </div>
    );
  });

  return (
    <section>
      <h2 className='text-2xl'>Notifications</h2>

      <div>{renderedNotifications}</div>
    </section>
  );
};

export default NotificationsList;
