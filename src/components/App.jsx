import React from 'react';

class App extends React.Component {
  render() {
    const { gon } = this.props;
    return (gon.channels.map((el) => (
      <div key={el.id}>
        <p>{el.name}</p>
      </div>
    )));
  }
}
export default App;
