/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import selectErrorMessage from '../utils';
import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: {
    data: [],
    validationState: 'valid',
  },
  reducers: {
    initChannelsState(state, { payload }) {
      state.data = payload;
    },
    addChannelSuccess(state, { payload: { channel } }) {
      state.data.push(channel);
      state.validationState = 'valid';
    },
    addChannelFailure(state) {
      state.validationState = 'invalid';
    },
    renameChannelSuccess(state, { payload: { channelId, name } }) {
      const index = _.findIndex(state.data, { id: channelId });
      const curentChannel = state.data[index];

      state.data[index] = {
        ...curentChannel,
        name,
      };
      state.validationState = 'valid';
    },
    renameChannelFailure(state) {
      state.validationState = 'invalid';
    },
    removeChannelSuccess(state, { payload: { channelId } }) {
      _.remove(state.data, ({ id }) => id === channelId);
      state.validationState = 'valid';
    },
    removeChannelFailure(state) {
      state.validationState = 'invalid';
    },
  },
});

const {
  addChannelFailure,
  removeChannelFailure,
  renameChannelFailure,
} = slice.actions;

const addChannel = ({ channel }) => async (dispatch) => {
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
    dispatch(addChannelFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const renameChannel = ({ id, channel }) => async (dispatch) => {
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
    dispatch(renameChannelFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const removeChannel = ({ id }) => async (dispatch) => {
  const path = routes.channelPath(id);
  try {
    await axios.delete(path);
  } catch (e) {
    dispatch(removeChannelFailure());
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
