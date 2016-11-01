import React, {Component} from 'react';
import AudioPlayer from './AudioPlayer';

const audioDeptManagement = `${process.env.PUBLIC_URL}/soundbytes/trump/dept_management.mp3`;
const audioRosie = `${process.env.PUBLIC_URL}/rosie.mp3`;


export default class AudioController extends Component {
  
  constructor(props) {
    super(props);
    this.state = {buffersLoaded: false, playing: false};
  }
  
  _assignAudioPlayerRef = c => this._audioPlayer = c;
  
  testSeek = () => {
    const currentPosition = this._audioPlayer.seek;
    console.log('current position', currentPosition);
    
  };
  
  render() {
    return (
      <div style={{margin:'0rem auto 0'}}>
        <AudioPlayer ref={this._assignAudioPlayerRef} audio={audioDeptManagement}/>
        <div onClick={this.testSeek} style={{cursor:'pointer', border:'5px solid orange'}}>TEST SEEK</div>
      </div>
    );
  }
}

