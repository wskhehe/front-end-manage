import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMenuAction } from '@/store/global/action';

import './Setting.css';

import asyncComponent from '@/utils/asyncComponent';
const DictList = asyncComponent(() => import('@/pages/setting/DictList'));
const DictAdd = asyncComponent(() => import('@/pages/setting/DictAdd'));

@connect(
  state => state,
  { setMenuAction }
)
class Setting extends Component {
  componentDidMount() {
    this.props.setMenuAction('setting');
  }
  render() {
    return (
      <div className="setting-page">
        <Switch>
          <Route path="/setting/dictlist" exact component={DictList} />
          <Route path="/setting/dictadd" exact component={DictAdd} />
          <Redirect to="/setting/dictlist" />
        </Switch>
      </div>
    );
  }
}
export default Setting;
