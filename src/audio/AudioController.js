import React, {Component} from 'react';
import AudioPlayer from './AudioPlayer';

const soundDeptManagement = `${process.env.PUBLIC_URL}/soundbytes/trump/dept_management.mp3`;
const soundRosie = `${process.env.PUBLIC_URL}/soundbytes/trump/rosie.mp3`;
const soundSniffSniff = `${process.env.PUBLIC_URL}/soundbytes/trump/sniffSniff.mp3`;


export default class AudioController extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentAudio: '',
      playAudioOnEnd: false,
      playing: false};
  }
  
  componentDidMount() {
    this.togglePlay('soundRosie');
    // this.setState({currentAudio: 'soundDeptManagement', playing:true})
  }
  
  _soundDeptManagementRef = c => this._soundDeptManagement = c;
  _soundRosieRef = c => this._soundRosie = c;
  _soundSniffSniffRef = c => this._soundSniffSniff = c;
  
  
  togglePlay = (audio) => {
    switch (audio) {
      case 'soundDeptManagement':
        this._soundDeptManagement.handleTogglePlay();
        break;
      case 'soundRosie':
        this._soundRosie.handleTogglePlay();
        break;
      case 'soundSniffSniff':
        this._soundSniffSniff.handleTogglePlay();
        break;
      default:
        this._soundDeptManagement.handleTogglePlay();
    }
  };
  
  stop = (audio) => {
    switch (audio) {
      case 'soundDeptManagement':
        this._soundDeptManagement.handleStop();
        break;
      case 'soundRosie':
        this._soundRosie.handleStop();
        break;
      case 'soundSniffSniff':
        this._soundSniffSniff.handleStop();
        break;
    }
  };
  
  pauseSniffPlay = () => {
    this._soundDeptManagement.handleTogglePlay();
    this._soundSniffSniff.handleTogglePlay();
    window.setTimeout(this._soundDeptManagement.handleTogglePlay(), 1000)
  };
  
  chainSounds = (togglePlayName:'', stopName: '') => {
    this.stop(stopName);
    this.togglePlay(togglePlayName);
  };
  
  render() {
    return (
      <div style={{margin:'0rem auto 0'}}>
        <AudioPlayer ref={this._soundDeptManagementRef} audio={soundDeptManagement}  parent={this}/>
        <AudioPlayer ref={this._soundRosieRef} audio={soundRosie} parent={this}/>
        <AudioPlayer ref={this._soundSniffSniffRef} audio={soundSniffSniff} parent={this}/>
        <div onClick={this.pauseSniffPlay} style={{cursor:'pointer',borderRadius:500, padding:5, border:'5px solid orange'}}>
          SNIFF SNIFF SNIFF</div>
      </div>
    );
  }
}

