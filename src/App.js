import React, {Component} from 'react';
import TrackAndMove from './views/TrackAndMove';

class App extends Component {
  render() {
    return (
      <div style={{margin:'2rem auto 0'}}>
        <div className="App-header">
          <TrackAndMove/>
        </div>
      </div>
    );
  }
}

export default App;
