import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../../routes';

const initialState = {
  data: [],
  channelAddingState: 'none',
  channelFetchingState: 'none',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannelsFromServer(state, { payload: { channels } }) {
      const currentState = state;
      currentState.postFetchingState = 'finished';
      _.assignIn(state.data, channels);
      return currentState;
    },
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
});

export const {
  fetchChannelsFromServer,
  addChannelRequest,
  addChannelSuccess,
  addChannelFailure,
} = channelsSlice.actions;

export const addChannel = ({ channel }) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    await axios.post(routes.channelsPath(), { data: { attributes: { name: channel.name } } });
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
};

export default channelsSlice.reducer;
