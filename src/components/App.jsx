import React from 'react';
import Channels from './Channels';
import Chat from './Chat';

const App = () => (
  <>
    <div className="container">
      <div className="row">
        <Channels />
        <Chat />
      </div>
    </div>
  </>
);

export default App;
