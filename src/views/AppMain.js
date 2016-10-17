import React from 'react';
import Coordinator from './Coordinator';
import compatibility from './../detect-track/compatibility';
import Smoother from './../detect-track/Smoother';
import objectdetect from './../detect-track/ObjectDetect';
// eslint-disable-next-line
import ObjectDetectFrontalFace from './../detect-track/ObjectDetectFrontalFace';


// need to apply transform: 'scale(-1, 1)' to each relevant container to make mirrored look

export default class AppMain extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    
    const
      smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0]),
      video = this._video;
    
    const play = () => {
      
      let detector;
      compatibility.requestAnimationFrame(play);
      if (video.paused)
        video.play();
      
      if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
        
        // Prepare the detector once the video dimensions are known:
        if (!detector) {
          const width = ~~(100 * video.videoWidth / video.videoHeight);
          const height = 100;
          detector = new objectdetect.detector(width, height, 1.1, objectdetect.frontalface);
        }
        
        // Perform the actual detection, need to further test performance issues, but .6
        // seems to produce good results with user's face's being relatively far from camera:
        const coords = detector.detect(video, .6);
        
        if (coords[0]) {
          let coord = smoother.smooth(coords[0]);
          
          // Rescale coordinates from detector to video coordinate space:
          const
            c0 = coord[0] *= video.videoWidth / detector.canvas.width,
            c1 = coord[1] *= video.videoHeight / detector.canvas.height,
            c2 = coord[2] *= video.videoWidth / detector.canvas.width,
            c3 = coord[3] *= video.videoHeight / detector.canvas.height;
          
          
          // Using hitboxes temporarily for dev to get ratios down right
          this._hitbox.style.left = ~~(c0 + c2 * (1.0 / 8) + video.offsetLeft) + 'px';
          this._hitbox.style.top = ~~(c1 + c3 * (0.8 / 8) + video.offsetTop) + 'px';
          this._hitbox.style.width = ~~(c2 * 6 / 8) + 'px';
          this._hitbox.style.height = ~~(c3 * 6 / 8) + 'px';
          this._hitbox.style.opacity = 1;
          
          // Sending coordinates to Coordinator.js
          this._coordinator.setCoordinates(c0, c1, c2, c3, this._video);
          
        } else {
          var opacity = this._hitbox.style.opacity - 0.2;
          this._hitbox.style.opacity = opacity > 0 ? opacity : 0;
        }
      }
    };
    
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
    
    const videoStyles = {
      boxShadow: '0 0 3px 0 #f2f2f2',
      overflow: 'hidden',
      borderRadius: 1500
    };
    
    return (
      <div style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <Coordinator ref={c=>this._coordinator=c}/>
        <video ref={c=>this._video=c} style={videoStyles}>{``}</video>
        <div ref={c=>this._hitbox=c} style={{zIndex:1000,border:'5px solid red',position: 'absolute', display: 'block', opacity: 0}}>
        </div>
      </div>
    );
  }
  
  
}