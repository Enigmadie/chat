/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'activeChannelId',
  initialState: {
    prevId: 1,
    id: 1,
  },
  reducers: {
    initActiveIdState(state, { payload }) {
      state.id = payload;
    },
    switchChannel(state, { payload: { currentChannelId } }) {
      if (state.id !== currentChannelId) {
        state.prevId = state.id;
        state.id = currentChannelId;
      }
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
