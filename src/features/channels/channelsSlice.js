import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    fetchDateFromServer(state, { payload: { channels } }) {
      return channels;
    },
  },
});

export const { fetchDateFromServer } = channelsSlice.actions;

export default channelsSlice.reducer;
