import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  messages: state.messages.data,
});

const ChatLog = ({ messages }) => {
  useEffect(() => {
    const logContainer = document.querySelector('.chat');
    logContainer.scrollTop = logContainer.scrollHeight;
  });

  return (
    <div className="column overflow-auto chat">
      {messages.map(({ id, name, text }) => (
        <p key={id}>
          {name}
          :
          {text}
        </p>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(ChatLog);
