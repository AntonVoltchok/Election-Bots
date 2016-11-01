import React, {Component} from 'react';
import AudioPlayer from './AudioPlayer';

const audioDeptManagement = `${process.env.PUBLIC_URL}/soundbytes/trump/dept_management.mp3`;
const audioRosie = `${process.env.PUBLIC_URL}/soundbytes/trump/rosie.mp3`;
const sniffSniff = `${process.env.PUBLIC_URL}/soundbytes/trump/sniffSniff.mp3`;


export default class AudioController extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentAudio: '',
      playAudioOnEnd: false,
      playing: false};
  }
  
  componentDidMount() {
    this.togglePlay('soundDeptManagement');
    // this.setState({currentAudio: 'audioDeptManagement', playing:true})
  }
  
  _soundDeptManagementRef = c => this._soundDeptManagement = c;
  _soundRosieRef = c => this._soundRosie = c;
  _soundSniffSniffRef = c => this._soundSniffSniff = c;
  
  // testSeek = () => {
  //   const currentPosition = this._audioPlayer.seek();
  //   console.log('current position', currentPosition);
  // };
  
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
        <AudioPlayer ref={this._soundDeptManagementRef} audio={audioDeptManagement}  parent={this}/>
        <AudioPlayer ref={this._soundRosieRef} audio={audioRosie} parent={this}/>
        <AudioPlayer ref={this._soundSniffSniffRef} audio={sniffSniff} parent={this}/>
        <div onClick={this.pauseSniffPlay} style={{cursor:'pointer',borderRadius:500, padding:5, border:'5px solid orange'}}>
          SNIFF SNIFF SNIFF</div>
      </div>
    );
  }
}

