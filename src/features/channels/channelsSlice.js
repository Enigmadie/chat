import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  data: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchDateFromServer(state, { payload: { channels } }) {
      _.assignIn(state.data, channels);
    },
  },
});

export const { fetchDateFromServer } = channelsSlice.actions;

export default channelsSlice.reducer;
