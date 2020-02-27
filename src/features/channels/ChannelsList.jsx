import React, { useState } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Channel from './Channel.jsx';
import ModalChannel from './ModalChannel.jsx';
import { addChannel, switchChannel as switchNewChannel } from './channelsSlice';

const mapStateToProps = (state) => ({
  channels: state.channels.data,
});

const mapDispatchToProps = { addChannel, switchChannel: switchNewChannel };

const ChannelsList = ({ channels, switchChannel }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className="pl-2 mb-1 ">Channels</p>
      <ListGroup variant="flush" className="flex-grow-1">
        {channels.map(({ id, name }) => (
          <Channel
            key={id}
            name={name}
            onClick={() => switchChannel({ currentChannelId: id })}
            className="list-group"
            id="list-tab"
            role="tablist"
          />
        ))}
      </ListGroup>
      <Button onClick={handleShow} variant="secondary" size="lg" className="rounded-0" block>
        + Add new channel
      </Button>
      <ModalChannel show={show} onHide={handleClose} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
