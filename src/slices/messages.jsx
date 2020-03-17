/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import selectErrorMessage from '../utils';
import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: {
    data: [],
    validationState: 'valid',
  },
  reducers: {
    initMessagesState(state, { payload }) {
      state.data = payload;
    },
    addMessageSuccess(state, { payload: { message } }) {
      state.data.push(message);
      state.validationState = 'valid';
    },
    addMessageFailure(state) {
      state.validationState = 'invalid';
    },
    removeChannelMessages(state, { payload: { id } }) {
      _.remove(state.data, ({ channelId }) => id === channelId);
    },
  },
});

const { addMessageFailure } = slice.actions;

const addMessage = ({ message, channelId }) => async (dispatch) => {
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
    dispatch(addMessageFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const { actions } = slice;

export { actions, addMessage };

export default slice.reducer;
