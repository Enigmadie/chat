import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';


import io from 'socket.io-client';
import cookies from 'js-cookie';
import faker from 'faker';
import gon from 'gon';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

cookies.set('name', faker.name.findName());

init(gon, cookies, io);
