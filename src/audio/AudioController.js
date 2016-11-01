import React, {Component} from 'react';
import AudioPlayer from './AudioPlayer';

const audioDeptManagement = `${process.env.PUBLIC_URL}/soundbytes/trump/dept_management.mp3`;
const audioRosie = `${process.env.PUBLIC_URL}/rosie.mp3`;
const sniffSniff =  `${process.env.PUBLIC_URL}/sniffSniff.mp3`;


export default class AudioController extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      buffersLoaded: false,
      playing: false};
  }
  
  componentDidMount() {
    this._soundDeptManagement.handleTogglePlay();
  }
  
  _soundDeptManagementRef = c => this._soundDeptManagement = c;
  _soundRosieRef = c => this._soundRosie = c;
  _soundSniffSniffRef = c => this._sniffSniff = c;
  
  // testSeek = () => {
  //   const currentPosition = this._audioPlayer.seek();
  //   console.log('current position', currentPosition);
  // };
  
  switchAudioSrc = (src) => {
    
  };
  
  render() {
    return (
      <div style={{margin:'0rem auto 0'}}>
        <AudioPlayer ref={this._soundDeptManagementRef} audio={audioDeptManagement} parent={this}/>
        <AudioPlayer ref={this._soundRosieRef} audio={audioRosie} parent={this}/>
        <AudioPlayer ref={this._soundSniffSniffRef()} audio={sniffSniff} parent={this}/>
        <div onClick={this.testSeek} style={{cursor:'pointer', border:'5px solid orange'}}>TEST SEEK</div>
      </div>
    );
  }
}

