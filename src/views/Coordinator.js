import React, {Component} from 'react';
import CharacterController from './CharacterController';

export default class Coordinator extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      xAxis: 0,
      yAxis: 0,
      hitBoxWidth: 0
    };
  }
  
  // @todo calculate distance between each time, if the number is under a certain threshold, ignore it
  
  // @todo change ratios to move away from coordinates and towards a single ratio at the center of the hitbox,
  // possibly with scale ratios as well
  
  setCoordinates = ({c0, c1, c2, c3, video}) => {
    //console.log('coordinates',c0,c1,c2,c3);
  
    const hitBoxWidth = (~~(c2 * 6 / 8));
    const xAxis = ~~(c0 + c2 * (1.0 / 8) + (video.offsetLeft));
    const yAxis = ~~(c1 + c3 * (0.8 / 8) + (video.offsetTop));
    this.setState({xAxis: xAxis, yAxis: yAxis, hitBoxWidth: hitBoxWidth});
    
    // this._hitbox.style.left = ~~(c0 + c2 * (1.0 / 8) + video.offsetLeft) + 'px';
    // this._hitbox.style.top = ~~(c1 + c3 * (0.8 / 8) + video.offsetTop) + 'px';
    // this._hitbox.style.width = ~~(c2 * 6 / 8) + 'px';
    // this._hitbox.style.height = ~~(c3 * 6 / 8) + 'px';
  };
  
  
  render() {
    const {cameraFeed} = this.props;
    const {xAxis, yAxis, hitBoxWidth} = this.state;
    
    if (!hitBoxWidth || !xAxis || !yAxis)
      return false;
    
    let xModifier = xAxis / cameraFeed.width;
    // console.log('xModifier before if', xModifier, hitBoxWidth);
    
    
    if (xModifier > 220)
      xModifier = 220;
    else if (xModifier < -220)
      xModifier = -220;
    
    return (
      <div>
        <CharacterController
          cameraFeed={cameraFeed}
          xAxis={xAxis - (hitBoxWidth / 1.5)}
          yAxis={yAxis}
          xModifier={xModifier}
          ref={c=>this._head=c}
          allowConstraints={true}/>
      </div>
    );
  }
}


























