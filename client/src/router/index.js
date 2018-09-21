import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import asyncComponent from '@/utils/asyncComponent';

import Layout from '@/layout/layout';

const Passport = asyncComponent(() => import('@/pages/passport/Home'));
const Dashboard = asyncComponent(() => import('@/pages/dashboard/Home'));
const Task = asyncComponent(() => import('@/pages/task/Home'));
const Setting = asyncComponent(() => import('@/pages/setting/Home'));
const Role = asyncComponent(() => import('@/pages/role/Home'));
const MyCenter = asyncComponent(() => import('@/pages/mycenter/Home'));

@connect(state => state)
class Router extends Component {
  render() {
    return (
      <Spin spinning={this.props.globalData.globalLoading}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Passport} />
            <Route path="/passport" component={Passport} />
            <Layout>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/task" component={Task} />
              <Route path="/setting" component={Setting} />
              <Route path="/role" component={Role} />
              <Route path="/mycenter" component={MyCenter} />
            </Layout>
            <Redirect to="/passport" />
          </Switch>
        </HashRouter>
      </Spin>
    );
  }
}

export default Router;
