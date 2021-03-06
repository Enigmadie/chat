import React from 'react';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

import connect from '../../connect';
import Channel from './Channel.jsx';

const mapStateToProps = ({ channels }) => ({ channels });

const ChannelsList = ({ switchChannel, showModal }) => {
  const channels = useSelector((state) => state.channels.data);

  return (
    <>
      <Row className="justify-content-between mx-0 px-2">
        <p className="pl-2 mb-1 ">Channels</p>
        <button
          onClick={() => showModal({ type: 'add', id: null, name: null })}
          className="pr-2 border-0 bg-transparent"
          type="button"
        >
          <img
            src="https://img.icons8.com/ios/20/000000/plus.png"
            alt="add"
          />
        </button>
      </Row>
      <ListGroup variant="flush" className="overflow-auto flex-grow-1">
        {channels.map(({ id, name, removable }) => (
          <Channel
            channelId={id}
            name={name}
            removable={removable}
            onClick={() => switchChannel({ currentChannelId: id })}
            className="list-group"
            id="list-tab"
            role="tablist"
          />
        ))}
      </ListGroup>
    </>
  );
};

export default connect(mapStateToProps)(ChannelsList);
