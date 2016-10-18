import React, {Component} from 'react';
import Tone from 'tone';

export default class AudioController extends Component {
  
  constructor(props) {
    super(props);
    this.state = {buffersLoaded: false, playing: false};
    
    this.trumpSamples = new Tone.Buffers({
      "dept_management": `${process.env.PUBLIC_URL}/soundbytes/trump/dept_management.mp3`,
      "rosie": `${process.env.PUBLIC_URL}/rosie.mp3`,
    });
    
    this.player = new Tone.Player({
      //onload: this.trumpSamples.get('dept_management'),
      playbackRate: 1.5,
      url: `${process.env.PUBLIC_URL}/rosie.mp3`,
      loop: true
    }).toMaster();
    
    this.player.autostart = true;
    console.log('this.player', this.player);
    
    this.player.url = `${process.env.PUBLIC_URL}/rosie.mp3`;
  }
  
  
  render() {
    return (
      <div style={{margin:'2rem auto 0'}}>Audio Here</div>
    );
  }
}


// this.player = new Tone.Player( `${process.env.PUBLIC_URL}/soundbytes/trump/dept_management.mp3`, function(){
//   //the player is now ready
// }).toMaster();


// this.osc = new Tone.Oscillator(440, "square")
//   .toMaster() //connected to the master output
//   .start(); // start it right away