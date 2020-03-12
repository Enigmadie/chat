import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

import connect from '../../connect';
import Channel from './Channel.jsx';
import ModalChannel from './ModalChannel.jsx';

const mapStateToProps = ({ channels }) => ({ channels });

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
      <Row className="justify-content-between mx-0 px-2">
        <p className="pl-2 mb-1 ">Channels</p>
        <button onClick={handleModalAdd} className="pr-2 border-0 bg-transparent" type="button">
          <img
            src="https://img.icons8.com/ios/20/000000/plus.png"
            alt="add"
          />
        </button>
      </Row>
      <ListGroup variant="flush" className="overflow-auto flex-grow-1">
        {channels.data.map(({ id, name, removable }) => (
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
