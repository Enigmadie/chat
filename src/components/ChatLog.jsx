import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import connect from '../connect';

const ChatLog = () => {
  const { messages, activeChannelId } = useSelector((state) => state);

  useEffect(() => {
    const logContainer = document.querySelector('.chat-log');
    logContainer.scrollTop = logContainer.scrollHeight;
  });

  return (
    <Col className="chat-log overflow-auto h-75 px-4">
      {messages.data
        .filter(({ channelId }) => channelId === activeChannelId.id)
        .map(({ id, name, text }) => (
          <p key={id}>
            {`${name}: ${text}`}
          </p>
        ))}
    </Col>
  );
};

export default connect()(ChatLog);
