import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', name: 'Kailash Nadh' },
  { id: '2', name: 'Amod Malviya' },
  { id: '3', name: 'Subhash Choudhary' },
  { id: '4', name: 'Rahul Chari' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
