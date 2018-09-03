import React, { Component } from 'react';
import './TaskDetail.css';

import logo from '@/assets/react-logo.svg';

class TaskDetail extends Component {
  render() {
    return (
      <div className="taskdetail-page">
        <h1>我是任务详情</h1>
        <div>
          <img src={logo} className="app-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default TaskDetail;
