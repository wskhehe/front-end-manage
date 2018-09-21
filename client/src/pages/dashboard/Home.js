import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMenuAction } from '@/store/global/action';

import asyncComponent from '@/utils/asyncComponent';
const WorkPlace = asyncComponent(() => import('@/pages/dashboard/WorkPlace'));

@connect(
  state => state,
  { setMenuAction }
)
class Dashboard extends Component {
  componentDidMount() {
    this.props.setMenuAction('dashboard');
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={WorkPlace} />
          <Route path="/dashboard/workplace" exact component={WorkPlace} />
          <Redirect to="/dashboard/workplace" />
        </Switch>
      </div>
    );
  }
}
export default Dashboard;
