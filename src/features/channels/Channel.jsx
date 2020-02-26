import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Channel = ({ name }) => (
  <ListGroup.Item action className="text-secondary border-0 bg-light py-1">
    {`# ${name}`}
  </ListGroup.Item>
);

export default Channel;
