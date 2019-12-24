import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const props = {
    channels: state.channels,
  }
  return props;
};

class Channels extends React.Component {
  render() {
    const { channels } = this.props;
    return (
          <div className="col-2">
            {channels.map((el) => (
              <div key={el.id} className="list-group" id="list-tab" role="tablist">
                <a className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">{el.name}</a>
              </div>
            ))}
          </div>
    );
  }
}

export default connect(mapStateToProps)(Channels);
