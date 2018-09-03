import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './module.common.css';
import Layout from '@/layout/layout';

import asyncComponent from '@/utils/asyncComponent';
const TaskList = asyncComponent(() => import('@/pages/task/TaskList'));
const TaskDetail = asyncComponent(() => import('@/pages/task/TaskDetail'));

class Task extends Component {
  render() {
    return (
      <Layout menuActive="2">
        <div className="task-page">
          <Switch>
            <Route path="/task/list" exact component={TaskList} />
            <Route path="/task/detail" exact component={TaskDetail} />
            <Redirect to="/task/list" exact />
          </Switch>
        </div>
      </Layout>
    );
  }
}
export default Task;
