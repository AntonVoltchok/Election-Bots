import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

export default class CameraRTC extends Component {
  
  static defaultProps = {
    audio: true,
    height: 1280,
    width: 720,
    onUserMedia: () => {
    }
  };
  
  static propTypes = {
    onUserMedia: PropTypes.func,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    className: PropTypes.string,
    audio: PropTypes.bool,
    muted: PropTypes.bool
  };
  
  static mountedInstances = [];
  
  static userMediaRequested = false;
  
  constructor(props) {
    super(props);
    this.state = {
      hasUserMedia: false
    };
  }
  
  componentDidMount() {
    if (!hasGetUserMedia()) return;
    
    CameraRTC.mountedInstances.push(this);
    
    if (!CameraRTC.userMediaRequested && !this.state.hasUserMedia) {
      this.requestUserMedia();
    }
  }
  
  requestUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
    let constraints;
    
    let sourceSelected = (audioSource, videoSource) => {
      
      constraints.video = {
        optional: [{sourceId: videoSource}]
      };
      
      if (this.props.audio)
        constraints.audio = {
          optional: [{sourceId: audioSource}]
        };
      
      navigator.getUserMedia(constraints, (stream) => {
        CameraRTC.mountedInstances.forEach((instance) => instance.handleUserMedia(null, stream));
      }, (e) => {
        CameraRTC.mountedInstances.forEach((instance) => instance.handleUserMedia(e));
      });
    };
    
    const {audioSource, videoSource} = this.props;
    
    if (audioSource && videoSource) {
      sourceSelected(audioSource, videoSource);
    } else {
      if ('mediaDevices' in navigator) {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          let audioSource = null;
          let videoSource = null;
          
          devices.forEach((device) => {
            if (device.kind === 'audio') {
              audioSource = device.id;
            } else if (device.kind === 'video') {
              videoSource = device.id;
            }
          });
          
          sourceSelected(audioSource, videoSource);
        })
          .catch((error) => {
            console.log(`${error.name}: ${error.message}`); // eslint-disable-line no-console
          });
      } else {
        MediaStreamTrack.getSources((sources) => {
          
          let audioSource = null, videoSource = null;
          
          sources.forEach((source) => {
            if (source.kind === 'audio')
              audioSource = source.id;
            else if (source.kind === 'video')
              videoSource = source.id;
          });
          
          sourceSelected(audioSource, videoSource);
        });
      }
    }
    
    CameraRTC.userMediaRequested = true;
  }
  
  handleUserMedia(error, stream) {
    if (error) {
      this.setState({hasUserMedia: false});
      return;
    }
    
    let src = window.URL.createObjectURL(stream);
    
    this.stream = stream;
    this.setState({hasUserMedia: true, src});
    
    this.props.onUserMedia();
  }
  
  componentWillUnmount() {
    let index = CameraRTC.mountedInstances.indexOf(this);
    CameraRTC.mountedInstances.splice(index, 1);
    
    if (CameraRTC.mountedInstances.length === 0 && this.state.hasUserMedia) {
      if (this.stream.stop) {
        this.stream.stop();
      } else {
        if (this.stream.getVideoTracks) {
          for (let track of this.stream.getVideoTracks()) {
            track.stop();
          }
        }
        if (this.stream.getAudioTracks) {
          for (let track of this.stream.getAudioTracks()) {
            track.stop();
          }
        }
      }
      CameraRTC.userMediaRequested = false;
      window.URL.revokeObjectURL(this.state.src);
    }
  }
  
  getScreenshot() {
    if (!this.state.hasUserMedia) return null;
    
    let canvas = this.getCanvas();
    return canvas.toDataURL(this.props.screenshotFormat);
  }
  
  getCanvas() {
    if (!this.state.hasUserMedia) return null;
    
    const video = this._video;
    if (!this.ctx) {
      let canvas = document.createElement('canvas');
      const aspectRatio = video.videoWidth / video.videoHeight;
      
      canvas.width = video.clientWidth;
      canvas.height = video.clientWidth / aspectRatio;
      
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }
    
    const {ctx, canvas} = this;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    return canvas;
  }
  
  render() {
    return (
      <video
        ref={c=>this._video=c}
        autoPlay
        width={this.props.width}
        height={this.props.height}
        src={this.state.src}
        muted={this.props.muted}
        className={this.props.className}
      />
    );
  }
  
}
