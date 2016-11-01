import Audio from 'react-howler'
import React, {} from 'react'
import raf from 'raf';

export default class AutoPlay extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0
    };
  }
  
  componentWillUnmount() {
    this.clearRAF()
  }
  
  _assignAudioPlayerRef = c => this._audioPlayer = c;
  
  get howler() {
    return window.Howler;
  }
  
  get duration() {
    return this._audioPlayer.duration();
  }
  
  seek = () => this._audioPlayer.seek();
  
  setSeek = value => this._audioPlayer.seek(value);
  
  handleOnLoad = () => this.setState({loaded: true, duration: this._audioPlayer.duration()});
  
  handleTogglePlay = () => this.setState({playing: !this.state.playing});
  
  handleLoopToggle = () => this.setState({loop: !this.state.loop});
  
  handleMuteToggle = () => this.setState({mute: !this.state.mute});
  
  handleOnPlay = () => {
    this.setState({
      playing: true
    });
    this.renderSeekPos()
  };
  
  handleOnEnd = () => {
    this.setState({
      playing: false
    });
    this.clearRAF()
  };
  
  handleStop = () => {
    this._audioPlayer.stop();
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    });
    this.renderSeekPos()
  };
  
  renderSeekPos = () => {
    this.setState({
      seek: this._audioPlayer.seek()
    });
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
      
      if (this.state.playing >= 1.5)
        this.handleStop();
    }
  };
  
  clearRAF = () => raf.cancel(this._raf);
  
  
  render() {
    const {audio} = this.props;
    
    
    // temporary UI for testing
    const devControlsContainerStyles = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      padding: 5,
      border: '4px solid purple',
      height: 130,
      overflow: 'scroll',
      fontSize: '.75rem'
    };
    
    return (
      <div>
        <Audio
          src={audio}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          ref={this._assignAudioPlayerRef}
        />
        
        {this.state.playing ?
          <div style={devControlsContainerStyles}>
            <button onClick={this.handleTogglePlay}>
              {(this.state.playing) ? 'Pause' : 'Play'}
            </button>
            <button onClick={this.handleStop}>
              Stop
            </button>
            <p>{(this.state.loaded) ? 'Loaded' : 'Loading'}</p>
            <p>
              {'Status: '}
              {(this.state.seek !== undefined) ? this.state.seek.toFixed(2) : 'NaN'}
              {' / '}
              {(this.state.duration) ? this.state.duration.toFixed(2) : 'NaN'}
            </p>
            <label>
              Loop:
              <input
                type='checkbox'
                checked={this.state.loop}
                onChange={this.handleLoopToggle}
              />
            </label>
            <label>
              Mute:
              <input
                type='checkbox'
                checked={this.state.mute}
                onChange={this.handleMuteToggle}
              />
            </label>
            <div>
              <label>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  value={this.state.volume}
                  onChange={e => this.setState({volume: parseFloat(e.target.value)})}/>
                <br /> Volume: {this.state.volume}
              </label>
            </div>
          </div> : false }
      </div>
    )
  }
}


// React Howler does not contain the Web Audio Analyser, but it does expose context
//
// componentDidMount() {
//   console.log('windowaudio', window.AudioContext);
//   console.log('logging this', this);
//
//   window.Howler.ctx = true;
//
//   console.log({
//     windowHowler: window.Howler,
//     windowHowlerCtx: window.Howler.ctx,
//     audioRef: this._audioPlayer
//   });
//
//   this.initAndConnectAnalyser();
// }
// connectMasterGainTo = (node) => console.log('windowaudio', window.AudioContext);
//
// connectNodeToDestination = (node) => node.connect(this.howler.destination);
//
// initAndConnectAnalyser = () => {
//   const analyser = this.howler.createAnalyser();
//   this.connectMasterGainTo(analyser);
//   this.connectNodeToDestination(analyser);
//   const dataArray = DataArray(analyser.frequencyBinCount);
//   return analyser.getByteTimeDomainData(dataArray);
// };