import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ChannelsList from '../features/channels/ChannelsList';
import ChatLog from '../features/messages/ChatLog';
import ChatInput from '../features/messages/ChatInput';

const App = () => (
  <Container>
    <Row>
      <div className="col-2">
        <ChannelsList />
      </div>
      <div className="col-10">
        <Container>
          <ChatLog />
          <ChatInput />
        </Container>
      </div>
    </Row>
  </Container>
);

export default App;
