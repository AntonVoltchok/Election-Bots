import React, {Component} from 'react';
import CharacterController from './CharacterController';

export default class Coordinator extends Component {
  
  constructor(props) {
    super(props);
    this.state = {xRatio: 0, yRatio: 0, devPanelOpen: false};
  }
  
  _assignCharacterControllerRef = c => this.characterController = c;
  
  // If focus point gets too choppy in the future, maybe calculate distance
  // between each time, if the number is under a certain threshold, ignore it
  
  setCoordinatorRatios = (focusPointInfo: {}) => {
    const {left, top, hitBoxWidth, hitBoxHeight, clientInfo} = focusPointInfo;
    const xRatio = Math.round(((left + (hitBoxWidth / 2)) / (clientInfo.width / 2)) * 100 - 100);
    const yRatio = Math.round(((top + (hitBoxHeight / 2)) / (clientInfo.height / 2)) * 100 - 100);
    this.setState({xRatio: xRatio, yRatio: yRatio});
  };
  
  
  render() {
    const {userCamera} = this.props;
    const {xRatio, yRatio} = this.state;
    
    return (
      <div>
        <h4 style={{position:'fixed', top:10, left:10, background: 'salmon'}}>focus output: {xRatio} / {yRatio}</h4>
        <CharacterController xRatio={xRatio} yRatio={yRatio} ref={this._assignCharacterControllerRef} userCamera={userCamera}/>
      </div>
    );
  }
}


























