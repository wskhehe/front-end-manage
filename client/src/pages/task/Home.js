import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMenuAction } from '@/store/global/action';
import './module.common.css';

import asyncComponent from '@/utils/asyncComponent';
const TaskList = asyncComponent(() => import('@/pages/task/TaskList'));
const TaskDetail = asyncComponent(() => import('@/pages/task/TaskDetail'));

@connect(
  state => state,
  { setMenuAction }
)
class Task extends Component {
  componentDidMount() {
    this.props.setMenuAction('task');
  }
  render() {
    return (
      <div className="task-page">
        <Switch>
          <Route path="/task/list" exact component={TaskList} />
          <Route path="/task/detail" exact component={TaskDetail} />
          <Redirect to="/task/list" exact />
        </Switch>
      </div>
    );
  }
}
export default Task;
