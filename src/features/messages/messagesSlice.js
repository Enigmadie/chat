import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../../routes';

const initialState = {
  data: { byId: {}, allIds: [] },
  postAddingState: 'none',
  postFetchingState: 'none',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesFromServer(state, { payload: { messages } }) {
      const currentState = state;

      currentState.data = {
        byId: _.keyBy(messages, 'id'),
        allIds: messages.map((el) => el.id),
      };

      currentState.postFetchingState = 'finished';
      return currentState;
    },
    addMessageRequest(state) {
      const currentState = state;
      currentState.postAddingState = 'requested';
      return currentState;
    },
    addMessageSuccess(state, { payload: { message } }) {
      const currentState = state;
      const { byId, allIds } = currentState.data;
      const { id } = message;

      currentState.data = {
        byId: { [id]: message, ...byId },
        allIds: [...allIds, id],
      };

      currentState.postAddingState = 'finished';
      return currentState;
    },
    addMessageFailure(state) {
      const currentState = state;
      currentState.postAddingState = 'failure';
      return currentState;
    },
  },
});

export const {
  fetchMessagesFromServer,
  addMessageSuccess,
  addMessageRequest,
  addMessageFailure,
} = messagesSlice.actions;

export const addMessage = ({ message, channelId }) => async (dispatch) => {
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

export default messagesSlice.reducer;
