import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMenuAction } from '@/store/global/action';

import asyncComponent from '@/utils/asyncComponent';
const RoleList = asyncComponent(() => import('@/pages/role/RoleList'));

@connect(
  state => state,
  { setMenuAction }
)
class Role extends Component {
  componentDidMount() {
    this.props.setMenuAction('role');
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/role/list" exact component={RoleList} />
          <Redirect to="/role/list" />
        </Switch>
      </div>
    );
  }
}
export default Role;
