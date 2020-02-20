import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const ChatLog = ({ messages }) => (
  <div className="row overflow-auto chat">
    {messages.map(({ id, name, text }) => (
      <span className="col-12" key={id}>
        {name}
        :
        {text}
      </span>
    ))}
  </div>
);

export default connect(mapStateToProps)(ChatLog);
