import React from 'react';
import _ from 'lodash';
import Row from 'react-bootstrap/Row';
import connect from '../connect';


const mapStateToProps = ({ channels, messages, activeChannelId }) => {
  const { id } = activeChannelId;
  const activeChannel = _.find(channels.data, { id });
  const countMessages = messages.data
    .filter(({ channelId }) => channelId === id)
    .length;

  return { countMessages, channel: activeChannel };
};

const ChatHeader = ({ countMessages, channel }) => {
  const channelName = `# ${channel.name}`;
  return (
    <Row className="border mx-0 justify-content-between">
      <h5 className="m-0 py-1 pl-3 font-weight-bold">
        {channelName}
      </h5>
      <Row className="mx-0 pr-4 pt-1">
        <img
          src="https://img.icons8.com/small/20/000000/speech-bubble.png"
          alt="messages"
          height="20"
          className="pr-1 pt-1"
        />
        <p className="m-0">{countMessages}</p>
      </Row>
    </Row>
  );
};

export default connect(mapStateToProps)(ChatHeader);
