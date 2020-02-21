import React from 'react';

const Channel = ({ name }) => (
  <a className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">{name}</a>
);

export default Channel;
