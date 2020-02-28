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

const mapDispatchToProps = { addNewChannel: addChannel, switchChannel: switchNewChannel };

const ChannelsList = ({ channels, switchChannel }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [modalAction, setModalAction] = useState('add');

  const handleModalAdd = () => {
    setModalAction('add');
    setShow(true);
  };

  const handleModalEdit = () => {
    setModalAction('edit');
    setShow(true);
  };

  const handleModalRemove = () => {
    setModalAction('remove');
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <p className="pl-2 mb-1 ">Channels</p>
      <ListGroup variant="flush" className="flex-grow-1">
        {channels.map(({ id, name }) => (
          <Channel
            key={id}
            name={name}
            onClick={() => switchChannel({ currentChannelId: id })}
            handleModalEdit={handleModalEdit}
            handleModalRemove={handleModalRemove}
            setValue={setValue}
            className="list-group"
            id="list-tab"
            role="tablist"
          />
        ))}
      </ListGroup>
      <Button onClick={handleModalAdd} variant="secondary" size="lg" className="rounded-0" block>
        + Add new channel
      </Button>
      <ModalChannel
        show={show}
        onHide={handleClose}
        modalAction={modalAction}
        value={value}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
