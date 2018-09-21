import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMenuAction } from '@/store/global/action';

@connect(
  state => state,
  { setMenuAction }
)
class MyCenter extends Component {
  componentDidMount() {
    this.props.setMenuAction('mycenter');
  }
  render() {
    return <div>个人中心</div>;
  }
}
export default MyCenter;
