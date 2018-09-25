import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(state => state)
class DictAdd extends Component {
  render() {
    return <div>添加字典</div>;
  }
}
export default DictAdd;
