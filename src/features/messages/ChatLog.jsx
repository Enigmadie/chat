import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const {
    messages: {
      data: {
        byId,
        allIds,
      },
    },
    channels: {
      currentChannelId,
    },
  } = state;

  const messages = allIds.map((id) => byId[id]);
  return { messages, activeChannelId: currentChannelId };
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
