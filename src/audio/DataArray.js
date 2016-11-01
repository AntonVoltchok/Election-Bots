import React from 'react';

export default class DataArray extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.Uint8Array = new Uint8Array();
  }
  
  render() {
    const {frequencyBinCount} = this.props;
    return this.Uint8Array(frequencyBinCount);
  }
}