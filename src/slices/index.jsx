import { combineReducers } from 'redux';

import channels, {
  actions as channelsActions,
  addChannel,
  renameChannel,
  removeChannel,
} from './channels.jsx';

import messages, { actions as messagesActions, addMessage } from './messages.jsx';

import activeChannelId, { actions as activeChannelIdActions } from './activeChannelId.jsx';

export default combineReducers({
  channels,
  messages,
  activeChannelId,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...activeChannelIdActions,
};

const asyncActions = {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
};

export {
  actions,
  asyncActions,
};
