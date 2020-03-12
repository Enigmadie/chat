/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import selectErrorMessage from '../utils';
import routes from '../routes';

const initialState = {
  data: [],
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    initMessagesState(state, { payload }) {
      state.data = payload;
    },
    addMessageSuccess(state, { payload: { message } }) {
      state.data = [...state.data, message];
    },
    removeChannelMessages(state, { payload: { id } }) {
      state.data.filter(({ channelId }) => channelId !== id);
    },
  },
});

const addMessage = ({ message, channelId }) => async () => {
  const path = routes.channelMessagesPath(channelId);
  try {
    await axios.post(path, {
      data: {
        attributes: {
          text: message.text,
          name: message.name,
        },
      },
    });
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const { actions } = slice;

export { actions, addMessage };

export default slice.reducer;
