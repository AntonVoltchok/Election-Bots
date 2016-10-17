import React, {Component} from 'react';
import AppMain from './views/AppMain';

class App extends Component {
  
  getClientInfo = () => {
    const w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return {
      x: x,
      y: y
    }
  };
  
  render() {
    
    const viewport = this.getClientInfo();
    console.log('viweoport', viewport);
  
    return (
      <div style={{margin:'2rem auto 0'}}>
          <AppMain viewport={viewport}/>
      </div>
    );
  }
}

export default App;
