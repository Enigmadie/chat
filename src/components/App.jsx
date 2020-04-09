import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

import ChannelsList from './Channels/ChannelsList';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';

toast.configure({
  position: 'top-right',
  autoClose: 15000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const App = ({ name }) => (
  <Row className="h-100">
    <Col xs={2} fluid className="mh-100 pt-3 px-0 bg-light d-flex flex-column ">
      <p className="pl-2 mb-1 pt-3">Name</p>
      <p className="pl-4 pb-4 text-secondary border-bottom">{name}</p>
      <ChannelsList />
    </Col>
    <Col xs={8} className="d-flex flex-column border p-0 bg-white h-100">
      <ChatLog />
      <ChatInput name={name} />
    </Col>
  </Row>
);

export default App;
