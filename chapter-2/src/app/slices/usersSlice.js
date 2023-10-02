import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', name: 'Shubham Purwar' },
  { id: '2', name: 'Kunal Shah' },
  { id: '3', name: 'Aman Gupta' },
];

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
