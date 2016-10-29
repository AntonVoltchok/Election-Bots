import React from 'react';
import Coordinator from './Coordinator';
import compatibility from './../detect-track/compatibility';
import Smoother from './../detect-track/Smoother';
import objectdetect from './../detect-track/ObjectDetect';
import AudioController from './../audio/AudioController';

// eslint-disable-next-line
import ObjectDetectFrontalFace from './../detect-track/ObjectDetectFrontalFace';


// need to apply transform: 'scale(-1, 1)' to each relevant container to make mirrored look

export default class AppMain extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {userCameraWidth: 0, userCameraHeight: 0};
  }
  
  componentDidMount() {
    
    const
      smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0], .15),
      video = this._video;
    
    const play = () => {
      
      let detector;
      compatibility.requestAnimationFrame(play);
      if (video.paused)
        video.play();
      
      if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
        
        this.setVideoDimensions(video);
        
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
          // Will be used for testing as well as moving masks and wigs over live camera feed
          const
            {clientInfo} = this.props,
            hitStyle = this._hitbox.style,
            focusStyle = this._focusPoint.style,
            c0 = coord[0] *= video.videoWidth / detector.canvas.width,
            c1 = coord[1] *= video.videoHeight / detector.canvas.height,
            c2 = coord[2] *= video.videoWidth / detector.canvas.width,
            c3 = coord[3] *= video.videoHeight / detector.canvas.height,
            left = ~~(c0 + c2 * (1.0 / 8) + video.offsetLeft),
            top = ~~(c1 + c3 * (0.8 / 8) + video.offsetTop),
            hitBoxWidth = ~~(c2 * 6 / 8),
            hitBoxHeight = ~~(c3 * 6 / 8),
            focusPointInfo = {left, top, hitBoxWidth, hitBoxHeight, clientInfo};
          
          this._coordinator.setCoordinatorRatios(focusPointInfo);
          
          
          focusStyle.left = `${left + (hitBoxWidth / 2)}px`;
          focusStyle.top = `${top + (hitBoxHeight / 2)}px`;
          
          hitStyle.left = `${left}px`;
          hitStyle.top = `${top}px`;
          hitStyle.width = `${hitBoxWidth}px`;
          hitStyle.height = `${hitBoxHeight}px`;
          hitStyle.opacity = 1;
        } else {
          const opacity = this._hitbox.style.opacity - 0.1;
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
  
  
  setVideoDimensions = (video) => {
    if (this.state.userCameraWidth === 0 && this.state.userCameraHeight === 0) {
      this.setState({userCameraWidth: video.videoWidth, userCameraHeight: video.videoHeight});
      console.log('usercamera', this.state.userCameraWidth, this.state.userCameraHeight);
    }
  };
  
  
  render() {
    
    const {clientInfo} = this.props;
    const userCamera = {
      width: this.state.userCameraWidth,
      height: this.state.userCameraHeight
    };
    console.log('camerafeed', userCamera);
    
    const
      videoStyles = {boxShadow: '0 0 3px 0 #f2f2f2', overflow: 'hidden', borderRadius: 1500},
      hitboxStyles = {
        zIndex: 1000,
        border: '5px solid hsla(4, 90%, 58%, .2)',
        position: 'absolute',
        display: 'block',
        opacity: 0,
        borderRadius: 1000
      },
      focusPointStyles = {
        zIndex: 1100,
        boxShadow: '0 0 10px 5px hsla(245, 95%, 45%, .45)',
        background: 'hsla(245, 95%, 33%,.4)',
        position: 'absolute',
        display: 'block',
        opacity: 1,
        borderRadius: 1000,
        width: 1,
        height: 1
      };
    
    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
        <AudioController/>
        <Coordinator userCamera={userCamera} clientInfo={clientInfo} ref={c=>this._coordinator=c}/>
        <h1 style={{width:'100%', textAlign:'center'}}>Tiny-Hands Trump</h1>
        <video ref={c=>this._video=c} style={videoStyles}>{``}</video>
        <div ref={c=>this._hitbox=c} style={hitboxStyles}></div>
        <div ref={c=>this._focusPoint=c} style={focusPointStyles}></div>
      </div>
    );
  }
  
  
}


//
// constructor(props) {
//   super(props)
//   this.synth = new Tone.SimpleSynth().toMaster()
// }