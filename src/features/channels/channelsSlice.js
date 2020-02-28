import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../../routes';

const initialState = {
  data: [],
  currentChannelId: 0,
  channelAddingState: 'none',
  channelFetchingState: 'none',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannelsFromServer(state, { payload: { channels, currentChannelId } }) {
      const currentState = state;
      currentState.postFetchingState = 'finished';
      currentState.currentChannelId = currentChannelId;
      _.assignIn(state.data, channels);
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
      _.assignIn(state.data, [...state.data, channel]);
      const currentState = state;
      currentState.channelAddingState = 'finished';
      return currentState;
    },
    addChannelFailure(state) {
      const currentState = state;
      currentState.channelAddingState = 'failure';
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

// export const deleteChannel = ({ id })

export default channelsSlice.reducer;
