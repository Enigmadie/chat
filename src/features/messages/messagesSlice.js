import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../../routes';

const initialState = {
  data: [],
  postAddingState: 'none',
  postFetchingState: 'none',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesFromServer(state, { payload: { messages } }) {
      const currentState = state;
      currentState.postFetchingState = 'finished';
      _.assignIn(state.data, messages);
      return currentState;
    },
    addMessageRequest(state) {
      const currentState = state;
      currentState.postAddingState = 'requested';
      return currentState;
    },
    addMessageSuccess(state, { payload: { message } }) {
      _.assignIn(state.data, [...state.data, message]);
      const currentState = state;
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

export const addMessage = ({ message }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    await axios.post(routes.channelMessagesPath('0'), { data: { attributes: { text: message.text, name: message.name } } });
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};

export default messagesSlice.reducer;
