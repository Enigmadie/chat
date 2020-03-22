/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'activeChannelId',
  initialState: {
    id: 0,
  },
  reducers: {
    initActiveIdState(state, { payload }) {
      state.id = payload;
    },
    switchChannel(state, { payload: { currentChannelId } }) {
      state.id = currentChannelId;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
