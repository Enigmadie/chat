import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Channel from './Channel.jsx';
import UserContext from '../../UserContext';

const mapStateToProps = (state) => ({
  channels: state.channels,
});

const ChannelsList = ({ channels }) => {
  const name = React.useContext(UserContext);
  return (
    <Container fluid className="py-3 px-0 h-100">
      <p className="pl-2 mb-1 pt-3">Name</p>
      <p className="pl-4 pb-4 text-secondary border-bottom">{name}</p>
      <p className="pl-2 mb-1 ">Channels</p>
      <ListGroup variant="flush" className='h-100'>
        <Col>
          {channels.data.map((channel) => (
            <Channel key={channel.id} name={channel.name} className="list-group" id="list-tab" role="tablist" />
          ))}
        </Col>
        <ListGroup.Item action className="align-bottom text-secondary border-0 bg-light py-1">
          Add new channel
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default connect(mapStateToProps)(ChannelsList);
