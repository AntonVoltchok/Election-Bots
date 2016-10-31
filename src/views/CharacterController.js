import React, {Component} from 'react';

export default class HeadContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    
    const {xRatio, yRatio} = this.props;
    
    const trumpHead = <img width='400px' src={process.env.PUBLIC_URL + '/image_assets/headNoEyes.png'}/>;
    const trumpEyes = <img width='400px' src={process.env.PUBLIC_URL + '/image_assets/eyesWithBrows.png'}/>;
    
    const
      xConstraintEyes =
        xRatio <= -5 ? -5 :
          xRatio >= 5 ? 5 :
            xRatio,
      yConstraintEyes =
        yRatio <= -15 ? -15 :
          yRatio >= 5 ? 5:
            yRatio,
      xConstraintFlipHead =
        xRatio <= -1 ? -1 :
          xRatio >= 0 ? 1 :
            xRatio,
      eyesContainerStyles = {
        position: 'absolute',
        top: 0,
        left: -200,
        zIndex: 101,
        transform: `translate3d(${xConstraintEyes}px, ${yConstraintEyes + -10}px, 0)`,
        transition: '0.15s'
      },
      headContainerStyles = {
        position: 'absolute',
        transform: `scaleX(${xConstraintFlipHead})`,
        top: 0,
        left: -200,
        zIndex: 100
      };
    
    return (
      <div>
        <div style={{position:'relative', maxWidth:'100%', display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <div style={headContainerStyles}>{trumpHead}</div>
          <div style={eyesContainerStyles}>{trumpEyes}</div>
        </div>
      </div>
    );
    
  }
}


//<div style={{transform: `translate(calc(${xAxis}px / ${repositionModifier}),calc(${yAxis}px / ${repositionModifier}))`,}}>


/*
 *
 *
 * const {yAxis, xAxis, xModifier, cameraFeed} = this.props;
 
 const repositionModifier = 4;
 
 const
 headStyles = {
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'space-around',
 width: cameraFeed.width,
 height: cameraFeed.height,
 borderRadius: "40%",
 border: '5px solid orange',
 background: 'orange',
 margin: '0 auto',
 transform: `rotateX(${xModifier === 155 || xModifier === -155 ? -10 : 0}deg) rotateY(${xModifier}deg)`,
 // rotateX(10deg) rotateY(10deg)
 transformStyle: 'preserve-3d',
 transition: '1s all linear'
 },
 eyeContainer = {
 position: 'relative',
 width: cameraFeed.width * .34,
 height: cameraFeed.height * .11,
 background: 'rgba(255,255,255,.9)',
 boxShadow: '0px -2px 10px 2px rgba(0,0,0,.4), 0px 5px 0px 4px rgba(0,0,0,.5)',
 overflow: 'hidden',
 transition: '1s all linear'
 },
 eyeBall = {
 position: 'absolute',
 top: cameraFeed.height * -.35,
 left: cameraFeed.width * 0.01,
 width: cameraFeed.width * .006,
 height: cameraFeed.width * .003,
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
 <div>xmodifier:{xModifier} / xaxis: {xAxis} / yAxis: {yAxis}</div>
 
 </div>
 );
 }
 *
 *
 * */















