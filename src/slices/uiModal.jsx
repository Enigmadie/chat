/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'uiModal',
  initialState: {
    show: false,
    type: null,
    channel: {},
  },
  reducers: {
    showModal(state, { payload: { type, id, name } }) {
      state.channel.id = id;
      state.channel.name = name;
      state.show = true;
      state.type = type;
    },
    hideModal(state) {
      state.show = false;
      state.type = null;
      state.channel = {};
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
