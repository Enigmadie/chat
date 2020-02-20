import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice';
import messagesReducer from '../features/messages/messagesSlice';

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
});
