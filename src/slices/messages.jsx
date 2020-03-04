/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes';

const initialState = {
  data: { byId: {}, allIds: [] },
  processing: false,
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    initMessagesState(state, { payload: { messages } }) {
      state.data = {
        byId: _.keyBy(messages, 'id'),
        allIds: messages.map((el) => el.id),
      };
      state.processing = false;
    },
    addMessageRequest(state) {
      state.processing = true;
    },
    addMessageSuccess(state, { payload: { message } }) {
      const { byId, allIds } = state.data;
      const { id } = message;

      state.data = {
        byId: { [id]: message, ...byId },
        allIds: [...allIds, id],
      };

      state.processing = false;
    },
    addMessageFailure(state) {
      state.processing = false;
    },
  },
});

const {
  addMessageRequest,
  addMessageFailure,
} = slice.actions;

const addMessage = ({ message, channelId }) => async (dispatch) => {
  const path = routes.channelMessagesPath(channelId);

  dispatch(addMessageRequest());
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
    throw e;
  }
};

const { actions } = slice;

export { actions, addMessage };

export default slice.reducer;
