import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { compareDesc } from 'date-fns';
import { client } from '../../api/client';

const notificationsAdapter = createEntityAdapter({
  sortComparer: (notificationA, notificationB) =>
    compareDesc(notificationA.date, notificationB.date),
});

const initialState = notificationsAdapter.getInitialState();

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = getAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';

    const response = await client.get(`/api/notifications?since=${latestTimestamp}`);
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload);

      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read;
      });
    });
  },
});

export const { selectAll: getAllNotifications } = notificationsAdapter.getSelectors(
  state => state.notifications
);

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
