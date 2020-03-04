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
  name: 'channels',
  initialState,
  reducers: {
    initChannelsState(state, { payload: { channels } }) {
      state.data = {
        byId: _.keyBy(channels, 'id'),
        allIds: channels.map(({ id }) => id),
      };
      state.processing = false;
    },
    addChannelRequest(state) {
      state.processing = true;
    },
    addChannelSuccess(state, { payload: { channel } }) {
      const { byId, allIds } = state.data;
      const { id } = channel;

      state.data = {
        byId: { [id]: channel, ...byId },
        allIds: [...allIds, id],
      };
      state.processing = false;
    },
    addChannelFailure(state) {
      state.processing = false;
    },
    renameChannelRequest(state) {
      state.processing = true;
    },
    renameChannelSuccess(state, { payload: { channelId, name } }) {
      const { byId, allIds } = state.data;
      const currentChannel = byId[channelId];

      currentChannel.name = name;
      state.data = {
        byId,
        allIds,
      };
      state.processing = false;
    },
    renameChannelFailure(state) {
      state.processing = false;
    },
    removeChannelRequest(state) {
      state.processing = true;
    },
    removeChannelSuccess(state, { payload: { channelId } }) {
      const { byId, allIds } = state.data;
      state.data = {
        byId: _.omit(byId, channelId),
        allIds: _.without(allIds, channelId),
      };
      state.processing = false;
    },
    removeChannelFailure(state) {
      state.processing = false;
    },
  },
});

const {
  addChannelRequest,
  addChannelFailure,
  renameChannelRequest,
  renameChannelFailure,
  removeChannelRequest,
  removeChannelFailure,
} = slice.actions;

const addChannel = ({ channel }) => async (dispatch) => {
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

const renameChannel = ({ id, channel }) => async (dispatch) => {
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

const removeChannel = ({ id }) => async (dispatch) => {
  const path = routes.channelPath(id);
  dispatch(removeChannelRequest());
  try {
    await axios.delete(path);
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};

const { actions } = slice;

export {
  actions,
  addChannel,
  renameChannel,
  removeChannel,
};

export default slice.reducer;
