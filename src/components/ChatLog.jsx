import React, { useEffect } from 'react';
import connect from '../connect';

const mapStateToProps = (state) => {
  const {
    messages: {
      data: {
        byId,
        allIds,
      },
    },
    activeChannelId: {
      id,
    },
  } = state;

  const messages = allIds.map((item) => byId[item]);
  return { messages, activeChannelId: id };
};

const ChatLog = ({ messages, activeChannelId }) => {
  useEffect(() => {
    const logContainer = document.querySelector('.vh-80');
    logContainer.scrollTop = logContainer.scrollHeight;
  });

  return (
    <div className="column overflow-auto vh-80 px-3">
      {messages
        .filter(({ channelId }) => channelId === activeChannelId)
        .map(({ id, name, text }) => (
          <p key={id}>
            {`${name}: ${text}`}
          </p>
        ))}
    </div>
  );
};

export default connect(mapStateToProps)(ChatLog);
