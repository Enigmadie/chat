import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  channels: state.channels,
});

const Channels = ({ channels }) => channels.map((el) => (
  <div key={el.id} className="list-group" id="list-tab" role="tablist">
    <a className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">{el.name}</a>
  </div>
));

export default connect(mapStateToProps)(Channels);
