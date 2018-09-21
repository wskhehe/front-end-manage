import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMenuAction } from '@/store/global/action';

@connect(
  state => state,
  { setMenuAction }
)
class Setting extends Component {
  componentDidMount() {
    this.props.setMenuAction('setting');
  }
  render() {
    return <div>系统设置</div>;
  }
}
export default Setting;
