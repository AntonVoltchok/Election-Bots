import Audio from 'react-howler'
import React, {} from 'react'
import raf from 'raf';
import DataArray from './DataArray';

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
  
  componentDidMount() {
    console.log('windowaudio', window.AudioContext);
    console.log('logging this', this);
    
    window.Howler.ctx = true;
    
    console.log({
      windowHowler: window.Howler,
      windowHowlerCtx: window.Howler.ctx,
      audioRef: this._audioPlayer
    });
    
    this.initAndConnectAnalyser();
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
  
  get seek() {
    this._audioPlayer.seek();
  }
  
  setSeek = value => this._audioPlayer.seek(value);
  
  handleOnLoad = () => this.setState({loaded: true, duration: this.audioPlayer.duration()});
  
  handleToggle = () => this.setState({playing: !this.state.playing});
  
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
    this.player.stop();
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    });
    this.renderSeekPos()
  };
  
  renderSeekPos = () => {
    this.setState({
      seek: this.player.seek()
    });
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  };
  
  clearRAF = () => raf.cancel(this._raf);
  
  
  
  // React Howler does not contain the Web Audio Analyser, but it does expose context
  
  connectMasterGainTo = (node) => console.log('windowaudio', window.AudioContext);
  
  connectNodeToDestination = (node) => node.connect(this.howler.destination);
  
  initAndConnectAnalyser = () => {
    
    //window.Howler.ctx = true;
    
    const analyser = this.howler.createAnalyser();
    // disconnecting gain from destination and connecting it to analyzer
    this.connectMasterGainTo(analyser);
    // connecting analyzer to destination (output)
    this.connectNodeToDestination(analyser);
    // get analyser output of what howler is playing
    //const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const dataArray = DataArray(analyser.frequencyBinCount);
    return analyser.getByteTimeDomainData(dataArray);
  };
  
  render() {
    const {audio} = this.props;
    
    // temporary UI for testing
    
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
        <button onClick={this.handleToggle}>
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
      
      </div>
    )
  }
}


// this.handleToggle = this.handleToggle.bind(this);
// this.handleOnLoad = this.handleOnLoad.bind(this);
// this.handleOnEnd = this.handleOnEnd.bind(this);
// this.handleOnPlay = this.handleOnPlay.bind(this);
// this.handleStop = this.handleStop.bind(this);
// this.renderSeekPos = this.renderSeekPos.bind(this);
// this.handleLoopToggle = this.handleLoopToggle.bind(this);
// this.handleMuteToggle = this.handleMuteToggle.bind(this);


