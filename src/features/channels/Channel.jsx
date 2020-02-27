import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Channel = ({ name, onClick }) => (
  <ListGroup.Item onClick={onClick} action className="text-secondary border-0 bg-light py-1">
    {`# ${name}`}
  </ListGroup.Item>
);

export default Channel;
