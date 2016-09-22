import React, {Component} from 'react';

export default class HeadContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      xAxis: 0,
      yAxis: 0,
      xAngle: 0,
      yAngle: 0,
      coord0: '',
      coord1: '',
      coord2: '',
      coord3: ''
    };
  }
  
  
  // calculate distance between each time, if the number is under a certain threshold, ignore it
  
  setCoordinates = (xAxis = 0, yAxis = 0, xAngle = 0, yAngle = 0, c0 = 0, c1 = 0, c2 = 0, c3 = 0) => {
    //this.setState({xAxis:xAxis, yAxis:yAxis, coord0:c0, coord1:c1, coord2:c2, coord3:c3});
    
    setInterval(this.setState({xAxis: xAxis, yAxis: yAxis, xAngle: xAngle, yAngle: yAngle}), 1200);
    
    
    // console.log({
    //   xAxis: this.state.xAxis,
    //   yAxis: this.state.yAxis,
    //   c0: this.state.coord0,
    //   c1: this.state.coord1,
    //   c2: this.state.coord2,
    //   c3: this.state.coord3
    // });
  };
  
  render() {
    
    const {repositionModifier} = this.props;
    const {xAxis, yAxis, xAngle, yAngle} = this.state;
    
    let formula = ((xAxis*.21) / .5) - 360;
    if (formula > 25)
      formula = 25;
    else if (formula < -25)
      formula = -25;
    
    const
      headStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '1000px',
        height: '600px',
        borderRadius: "40%",
        border: '5px solid orange',
        background: 'orange',
        margin: '0 auto',
        transform: `rotateX(${formula === 25 || formula === -25 ? -10 : 0}deg) rotateY(${formula}deg)`,
        // rotateX(10deg) rotateY(10deg)
        transformStyle: 'preserve-3d',
        transition: '1s all linear'
      },
      eyeContainer = {
        position: 'relative',
        width: 340,
        height: 100,
        background: 'rgba(255,255,255,.9)',
        boxShadow: '0px -2px 10px 2px rgba(0,0,0,.4), 0px 5px 0px 4px rgba(0,0,0,.5)',
        overflow: 'hidden',
        transition: '1s all linear'
      },
      eyeBall = {
        position: 'absolute',
        top: -130,
        left: -70,
        width: 10,
        height: 10,
        borderRadius: 1000,
        border: '10px solid rgba(0,0,0,0.12)',
        boxShadow: '0 0 0 20px rgba(0,0,0,0.6), 0 0 0 30px rgba(0,0,0,0.7)',
        backgroundColor: '#fff',
        transition: '1s all linear'
      },
      leftEyeBall = {
        ...eyeBall,
        transform: 'rotate(95deg)',
        borderRadius: '10% 50% 20% 20%'
      },
      rightEyeBall = {
        ...eyeBall,
        transform: 'rotate(-95deg)',
        borderRadius: '50% 10% 20% 20%'
      };
    
    return (
      <div style={{perspective: 750, transformStyle: 'preserve-3d'}}>
        <div style={headStyles}>
          <div style={{...eyeContainer, borderRadius: '30% 60px 60px 80%', transform:'rotate(5deg)'}}>
            <div style={{transform: `translate(calc(${xAxis}px / ${repositionModifier}),calc(${yAxis}px / ${repositionModifier}))`,}}>
              <div style={leftEyeBall}></div>
            </div>
          </div>
          <div style={{...eyeContainer, borderRadius: '60px 30% 80% 60px',transform:'rotate(-5deg)'}}>
            <div style={{transform: `translate(calc(${xAxis}px / ${repositionModifier}),calc(${yAxis}px / ${repositionModifier}))`,}}>
              <div style={rightEyeBall}></div>
            </div>
          </div>
        </div>
        <div>{formula}</div>
        
      </div>
    );
  }
}


























