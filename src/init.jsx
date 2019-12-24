import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App.jsx';
import UserContext from './UserContext';
import * as actions from './actions';

const init = (gon, cookies, io) => {
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();
  /* eslint-enable */

  const store = createStore(
    reducers,
    gon,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    ),
  );

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessageSuccess({ message: payload.data.attributes }));
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
