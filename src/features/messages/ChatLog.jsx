import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  messages: state.messages.data,
  activeChannelId: state.channels.currentChannelId,
});

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
