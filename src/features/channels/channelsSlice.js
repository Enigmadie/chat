import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../../routes';

const initialState = {
  data: { byId: {}, allIds: [] },
  currentChannelId: 0,
  channelAddingState: 'none',
  channelFetchingState: 'none',
  channelRemovingState: 'none',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannelsFromServer(state, { payload: { channels, currentChannelId } }) {
      const currentState = state;
      currentState.currentChannelId = currentChannelId;

      currentState.data = {
        byId: _.keyBy(channels, 'id'),
        allIds: channels.map((el) => el.id),
      };

      currentState.postFetchingState = 'finished';
      return currentState;
    },
    switchChannel(state, { payload: { currentChannelId } }) {
      const currentState = state;
      currentState.currentChannelId = currentChannelId;
      return currentState;
    },
    addChannelRequest(state) {
      const currentState = state;
      currentState.channelAddingState = 'requested';
      return currentState;
    },
    addChannelSuccess(state, { payload: { channel } }) {
      const currentState = state;
      const { byId, allIds } = currentState.data;
      const { id } = channel;

      currentState.data = {
        byId: { [id]: channel, ...byId },
        allIds: [...allIds, id],
      };

      currentState.channelAddingState = 'finished';
      return currentState;
    },
    addChannelFailure(state) {
      const currentState = state;
      currentState.channelAddingState = 'failure';
      return currentState;
    },
    renameChannelRequest(state) {
      const currentState = state;
      currentState.channelEditingState = 'requested';
      return currentState;
    },
    renameChannelSuccess(state, { payload: { channelId, name } }) {
      const currentState = state;
      const { byId, allIds } = currentState.data;
      const currentChannel = byId[channelId];

      currentChannel.name = name;
      currentState.data = {
        byId,
        allIds,
      };
      currentState.channelEditingState = 'finished';
      return currentState;
    },
    renameChannelFailure(state) {
      const currentState = state;
      currentState.channelEditingState = 'failure';
      return currentState;
    },
    removeChannelRequest(state) {
      const currentState = state;
      currentState.channelRemovingState = 'requested';
      return currentState;
    },
    removeChannelSuccess(state, { payload: { channelId } }) {
      const currentState = state;
      const { byId, allIds } = currentState.data;
      currentState.data = {
        byId: _.omit(byId, channelId),
        allIds: _.without(allIds, channelId),
      };
      currentState.channelRemovingState = 'finished';
      return currentState;
    },
    removeChannelFailure(state) {
      const currentState = state;
      currentState.channelRemovingState = 'failure';
      return currentState;
    },
  },
});

export const {
  fetchChannelsFromServer,
  switchChannel,
  addChannelRequest,
  addChannelSuccess,
  addChannelFailure,
  renameChannelRequest,
  renameChannelSuccess,
  renameChannelFailure,
  removeChannelRequest,
  removeChannelSuccess,
  removeChannelFailure,
} = channelsSlice.actions;

export const addChannel = ({ channel }) => async (dispatch) => {
  const path = routes.channelsPath();

  dispatch(addChannelRequest());
  try {
    await axios.post(path, {
      data: {
        attributes: {
          name: channel,
        },
      },
    });
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
};

export const renameChannel = ({ id, channel }) => async (dispatch) => {
  const path = routes.channelPath(id);
  dispatch(renameChannelRequest());
  try {
    await axios.patch(path, {
      data: {
        attributes: {
          name: channel,
        },
      },
    });
  } catch (e) {
    dispatch(renameChannelFailure());
    throw e;
  }
};

export const removeChannel = ({ id }) => async (dispatch) => {
  const path = routes.channelPath(id);
  dispatch(removeChannelRequest());
  try {
    await axios.delete(path);
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};

export default channelsSlice.reducer;
