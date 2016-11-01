import React, {Component} from 'react';
import AudioPlayer from './AudioPlayer';

const audioDeptManagement = `${process.env.PUBLIC_URL}/soundbytes/trump/dept_management.mp3`;
const audioRosie = `${process.env.PUBLIC_URL}/rosie.mp3`;


export default class AudioController extends Component {
  
  constructor(props) {
    super(props);
    this.state = {buffersLoaded: false, playing: false};
  }
  
  render() {
    return (
      <div style={{margin:'0rem auto 0'}}>
        <AudioPlayer audio={audioDeptManagement}/>
      </div>
    );
  }
}

