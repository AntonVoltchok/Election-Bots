import React, {Component} from 'react';
import HeadContainer from './HeadContainer';
import compatibility from './../detect-track/compatibility';
import Smoother from './../detect-track/Smoother';
import objectdetect from './../detect-track/ObjectDetect';
// eslint-disable-next-line
import ObjectDetectFrontalFace from './../detect-track/ObjectDetectFrontalFace';


export default class TrackAndMove extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    
    const
      smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0]),
      video = this._video,
      head = this._head,
      hitbox = this._hitbox;
    
    function play() {
      
      let detector;
      compatibility.requestAnimationFrame(play);
      if (video.paused)
        video.play();
      
      if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
        
        // Prepare the detector once the video dimensions are known:
        if (!detector) {
          var width = ~~(60 * video.videoWidth / video.videoHeight);
          var height = 60;
          detector = new objectdetect.detector(width, height, 1.1, objectdetect.frontalface);
        }
        
        // Perform the actual detection:
        const coords = detector.detect(video, 1);
        //console.log('coords', coords);
  
        
        if (coords[0]) {
          var coord = coords[0];
          coord = smoother.smooth(coord);
          
          // Rescale coordinates from detector to video coordinate space:
          coord[0] *= video.videoWidth / detector.canvas.width;
          coord[1] *= video.videoHeight / detector.canvas.height;
          coord[2] *= video.videoWidth / detector.canvas.width;
          coord[3] *= video.videoHeight / detector.canvas.height;
          
          // Display hitbox overlay:
          let
            xAxis = ~~(coord[0] + coord[2] * 1.0 / 8 + video.offsetLeft),
            yAxis = ~~(coord[1] + coord[3] * 0.8 / 8 + video.offsetTop),
            xAngle = ~~(coord[2] * 6 / 8),
            yAngle = ~~(coord[3] * 6 / 8);
          
          
          hitbox.style.left = ~~(coord[0] + coord[2] * 1.0 / 8 + video.offsetLeft) + 'px';
          hitbox.style.top = ~~(coord[1] + coord[3] * 0.8 / 8 + video.offsetTop) + 'px';
          hitbox.style.width = ~~(coord[2] * 6 / 8) + 'px';
          hitbox.style.height = ~~(coord[3] * 6 / 8) + 'px';
          hitbox.style.opacity = 1;
  
          // Sending coordinates to HeadContainer.js
          head.setCoordinates(xAxis,yAxis,xAngle,yAngle);
          //head.setCoordinates(xAxis,yAxis,coord[0],coord[1],coord[2],coord[3]);
          
        } else {
          var opacity = hitbox.style.opacity - 0.2;
          hitbox.style.opacity = opacity > 0 ? opacity : 0;
        }
      }
    }
    
    try {
      compatibility.getUserMedia({video: true}, function (stream) {
        try {
          video.src = compatibility.URL.createObjectURL(stream);
        } catch (error) {
          video.src = stream;
        }
        compatibility.requestAnimationFrame(play);
      }, (error)=> {
        alert('WebRTC not available');
      });
    } catch (error) {
      alert(error);
    }
    
  };
  
 
  
  render() {
    
    return (
      <div style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <HeadContainer ref={c=>this._head=c} repositionModifier='4' allowConstraints={true} />
        <video ref={c=>this._video=c} style={{float: 'left', marginRight: '1em'}}>..</video>
        <div ref={c=>this._hitbox=c} style={{zIndex:1000,border:'5px solid red',position: 'absolute', display: 'block', opacity: 0}}>
        </div>
      </div>
    );
  }
  
  
}