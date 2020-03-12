/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import selectErrorMessage from '../utils';
import routes from '../routes';

const initialState = {
  data: [],
};

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannelsState(state, { payload }) {
      state.data = payload;
    },
    addChannelSuccess(state, { payload: { channel } }) {
      state.data = [...state.data, channel];
    },
    renameChannelSuccess(state, { payload: { channelId, name } }) {
      state.data.map((el) => {
        if (el.id === channelId) {
          el.name = name;
        }
        return el;
      });
    },
    removeChannelSuccess(state, { payload: { channelId } }) {
      state.data.filter(({ id }) => id !== channelId);
    },
  },
});

const addChannel = ({ channel }) => async () => {
  const path = routes.channelsPath();
  try {
    await axios.post(path, {
      data: {
        attributes: {
          name: channel,
        },
      },
    });
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const renameChannel = ({ id, channel }) => async () => {
  const path = routes.channelPath(id);
  try {
    await axios.patch(path, {
      data: {
        attributes: {
          name: channel,
        },
      },
    });
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const removeChannel = ({ id }) => async () => {
  const path = routes.channelPath(id);
  try {
    await axios.delete(path);
  } catch (e) {
    selectErrorMessage(e);
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
