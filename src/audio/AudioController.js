import React, {Component} from 'react';

// "dept_management": `${process.env.PUBLIC_URL}/soundbytes/trump/dept_management.mp3`,
//   "rosie": `${process.env.PUBLIC_URL}/rosie.mp3`,


export default class AudioController extends Component {
  
  constructor(props) {
    super(props);
    this.state = {buffersLoaded: false, playing: false};
  }
  
  render() {
    return (
      <div style={{margin:'2rem auto 0'}}>Audio Here</div>
    );
  }
}

