import React from 'react';
import { connect } from 'react-redux';
import Channel from './Channel.jsx';

const mapStateToProps = (state) => ({
  channels: state.channels,
});

const ChannelsList = ({ channels }) => (
  channels.data.map((channel) => (
    <Channel key={channel.id} name={channel.name} className="list-group" id="list-tab" role="tablist" />
  ))
);

export default connect(mapStateToProps)(ChannelsList);
