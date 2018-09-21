import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import asyncComponent from '@/utils/asyncComponent';

const Login = asyncComponent(() => import('@/pages/passport/Login'));

class Passport extends Component {
  render() {
    return (
      <Switch>
        <Route path="/passport/login" exact component={Login} />
        <Redirect to="/passport/login" />
      </Switch>
    );
  }
}
export default Passport;
