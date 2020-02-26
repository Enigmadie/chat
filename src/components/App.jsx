import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ChannelsList from '../features/channels/ChannelsList';
import ChatLog from '../features/messages/ChatLog';
import ChatInput from '../features/messages/ChatInput';

const App = () => (
  <Row className='mh-100'>
    <Col xs={2} className="p-0 bg-light">
      <ChannelsList />
    </Col>
    <Col xs={8} className="border p-0 pb-3 bg-white">
      <ChatLog />
      <ChatInput />
    </Col>
  </Row>
);

export default App;
