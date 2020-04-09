import { combineReducers } from 'redux';

import channels, {
  actions as channelsActions,
  addChannel,
  renameChannel,
  removeChannel,
} from './channels.jsx';

import messages, { actions as messagesActions, addMessage } from './messages.jsx';

import activeChannelId, { actions as activeChannelIdActions } from './activeChannelId.jsx';

import uiModal, { actions as uiModalActions } from './uiModal.jsx';

export default combineReducers({
  channels,
  messages,
  activeChannelId,
  uiModal,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...activeChannelIdActions,
  ...uiModalActions,
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
