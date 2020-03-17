import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App.jsx';
import UserContext from './UserContext';
import reducer, { actions } from './slices';

const init = (gon, cookies, io) => {
  const socket = io();
  const store = configureStore({
    reducer,
  });
  const { channels, messages, currentChannelId } = gon;

  store.dispatch(actions.initChannelsState(channels));
  store.dispatch(actions.initMessagesState(messages));
  store.dispatch(actions.initActiveIdState(currentChannelId));

  socket.on('newMessage', ({ data }) => {
    store.dispatch(actions.addMessageSuccess({ message: data.attributes }));
  });

  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.addChannelSuccess({ channel: data.attributes }));
  });

  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.removeChannelSuccess({ channelId: data.id }));
  });

  socket.on('renameChannel', ({ data }) => {
    const { name } = data.attributes;
    store.dispatch(actions.renameChannelSuccess({ channelId: data.id, name }));
  });

  const name = cookies.get('name');

  render(
    <Provider store={store}>
      <UserContext.Provider value={name}>
        <App name={name} />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
