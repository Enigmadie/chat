import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');

export const addChannel = createAction('ADD_CHANNEL');

export const addMessage = ({ message }) => async () => {
  await axios.post(routes.channelMessagesPath('0'), { data: { attributes: { text: message.text, name: message.name } } });
};
