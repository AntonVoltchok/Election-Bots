import React, {Component} from 'react';
import AppMain from './views/AppMain';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {clientWidth: 0, clientHeight: 0};
  }
  
  componentDidMount() {
    const
      w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;
    this.setState({clientWidth: x, clientHeight: y});
  }
  
  
  render() {
    
    console.log('viweoport',this.state.clientWidth, this.state.clientHeight);
 
    const clientInfo = {
      width: this.state.clientWidth,
      height: this.state.clientHeight
    };
    
    
    return (
      <div>
        <AppMain clientInfo={clientInfo}/>
      </div>
    );
  }
}

export default App;
