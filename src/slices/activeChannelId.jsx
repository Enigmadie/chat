/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
};

const slice = createSlice({
  name: 'activeChannelId',
  initialState,
  reducers: {
    initActiveIdState(state, { payload: { currentChannelId } }) {
      state.id = currentChannelId;
    },
    switchChannel(state, { payload: { currentChannelId } }) {
      state.id = currentChannelId;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
