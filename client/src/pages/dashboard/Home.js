import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '@/layout/layout';

import asyncComponent from '@/utils/asyncComponent';
const WorkPlace = asyncComponent(() => import('@/pages/dashboard/WorkPlace'));

class Dashboard extends Component {
  render() {
    return (
      <Layout menuActive="1">
        <Switch>
          <Route path="/" exact component={WorkPlace} />
          <Route path="/dashboard/workplace" exact component={WorkPlace} />
          <Redirect to="/dashboard/workplace" />
        </Switch>
      </Layout>
    );
  }
}
export default Dashboard;
