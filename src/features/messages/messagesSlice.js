import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    fetchDateFromServer(state, { payload: { messages } }) {
      return messages;
    },
    addMessageSuccess(state, { payload: { message } }) {
      return [...state, message];
    },
  },
});

export const addMessage = ({ message }) => async () => {
  await axios.post(routes.channelMessagesPath('0'), { data: { attributes: { text: message.text, name: message.name } } });
};

export const { fetchDateFromServer, addMessageSuccess } = messagesSlice.actions;

export default messagesSlice.reducer;
