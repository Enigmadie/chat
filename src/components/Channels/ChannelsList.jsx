import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import connect from '../../connect';
import Channel from './Channel.jsx';
import ModalChannel from './ModalChannel.jsx';

const mapStateToProps = (state) => {
  const {
    channels: {
      data: {
        byId,
        allIds,
      },
    },
  } = state;

  const channels = allIds.map((id) => byId[id]);
  return { channels };
};

const ChannelsList = ({ channels, switchChannel }) => {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelId, setChannelId] = useState(0);
  const [modalAction, setModalAction] = useState('add');

  const handleModalAdd = () => {
    setModalAction('add');
    setShow(true);
  };

  const handleModalRename = (id, name) => {
    setChannelId(id);
    setChannelName(name);
    setModalAction('rename');
    setShow(true);
  };

  const handleModalRemove = (id, name) => {
    setChannelId(id);
    setChannelName(name);
    setModalAction('remove');
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <p className="pl-2 mb-1 ">Channels</p>
      <ListGroup variant="flush" className="flex-grow-1">
        {channels.map(({ id, name, removable }) => (
          <Channel
            key={id}
            name={name}
            removable={removable}
            onClick={() => switchChannel({ currentChannelId: id })}
            handleModalRename={() => handleModalRename(id, name)}
            handleModalRemove={() => handleModalRemove(id, name)}
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
        channelName={channelName}
        setChannelName={setChannelName}
        channelId={channelId}
      />
    </>
  );
};

export default connect(mapStateToProps)(ChannelsList);
