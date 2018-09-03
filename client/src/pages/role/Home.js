import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '@/layout/layout';

import asyncComponent from '@/utils/asyncComponent';
const RoleList = asyncComponent(() => import('@/pages/role/RoleList'));

class Role extends Component {
  render() {
    return (
      <Layout menuActive="3">
        <Switch>
          <Route path="/role/list" exact component={RoleList} />
          <Redirect to="/role/list" />
        </Switch>
      </Layout>
    );
  }
}
export default Role;
