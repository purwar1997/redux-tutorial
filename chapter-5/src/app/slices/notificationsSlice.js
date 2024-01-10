import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { compareDesc } from 'date-fns';
import { client } from '../../api/client';

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
  initialState: [],
  reducers: {
    allNotificationsRead(state) {
      state.forEach(notification => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);

      state.forEach(notification => {
        notification.isNew = !notification.read;
      });

      state.sort((notificationOne, notificationTwo) =>
        compareDesc(notificationOne.date, notificationTwo.date)
      );
    });
  },
});

export const getAllNotifications = state => state.notifications;

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
