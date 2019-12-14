import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

const init = (gon) => {
  render(<App gon={gon} />, document.getElementById('chat'));
};

export default init;
