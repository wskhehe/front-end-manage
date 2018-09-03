import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import asyncComponent from '@/utils/asyncComponent';

const Dashboard = asyncComponent(() => import('@/pages/dashboard/Home'));
const Task = asyncComponent(() => import('@/pages/task/Home'));
const Setting = asyncComponent(() => import('@/pages/setting/Home'));
const Role = asyncComponent(() => import('@/pages/role/Home'));
const MyCenter = asyncComponent(() => import('@/pages/mycenter/Home'));
@connect((state) => state)
class Router extends Component {
  render() {
    return (
      <Spin spinning={this.props.globalData.globalLoading}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/task" component={Task} />
            <Route path="/setting" component={Setting} />
            <Route path="/role" component={Role} />
            <Route path="/mycenter" component={MyCenter} />
            <Redirect to="/dashboard" />
          </Switch>
        </HashRouter>
      </Spin>
    );
  }
}

export default Router;
