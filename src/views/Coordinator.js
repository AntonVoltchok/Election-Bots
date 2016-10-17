import React, {Component} from 'react';
import HeadContainer from './HeadContainer';

export default class Coordinator extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      xAxis: 0,
      yAxis: 0
    };
  }
  
  // @todo calculate distance between each time, if the number is under a certain threshold, ignore it
  
  setCoordinates = (c0, c1, c2, c3, video) => {
    
    const
      xAxis = ~~(c0 + c2 * (1.0 / 8) + (video.offsetLeft - 50)),
      yAxis = ~~(c1 + c3 * (0.8 / 8) + (video.offsetTop - 40));
    
    this.setState({xAxis: xAxis, yAxis: yAxis});
    
  };
  
  
  render() {
    const {xAxis, yAxis} = this.state;
  
    let xModifier = ((xAxis*.21) / .5) - 360;
    if (xModifier > 25)
      xModifier = 25;
    else if (xModifier < -25)
      xModifier = -25;
    
    return (
      <div>
        <HeadContainer
          xAxis={xAxis}
          yAxis={yAxis}
          xModifier={xModifier}
          ref={c=>this._head=c}
          allowConstraints={true}/>
      </div>
    );
  }
}


























