import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ChannelsList from './Channels/ChannelsList';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';
import UserContext from '../UserContext';

const App = () => {
  const name = React.useContext(UserContext);

  return (
    <Row>
      <Col xs={2} fluid className="pt-3 px-0 bg-light vh-87 d-flex flex-column ">
        <p className="pl-2 mb-1 pt-3">Name</p>
        <p className="pl-4 pb-4 text-secondary border-bottom">{name}</p>
        <ChannelsList />
      </Col>
      <Col xs={8} className="border p-0 pb-3 bg-white vh-87">
        <ChatLog />
        <ChatInput name={name} />
      </Col>
    </Row>
  );
};

export default App;
