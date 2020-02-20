import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.jsx';
import UserContext from './UserContext';
import rootReducer from './reducers';
import { fetchDateFromServer as fetchMessages, addMessageSuccess } from './features/messages/messagesSlice.js';
import { fetchDateFromServer as fetchChannels } from './features/channels/channelsSlice.js';

const init = (gon, cookies, io) => {
  const socket = io();

  const store = configureStore({
    reducer: rootReducer,
  });

  store.dispatch(fetchChannels(gon));
  store.dispatch(fetchMessages(gon));

  socket.on('newMessage', ({ data }) => {
    store.dispatch(addMessageSuccess({ message: data.attributes }));
  });

  render(
    <Provider store={store}>
      <UserContext.Provider value={cookies.get('name')}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
