import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
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
        <Link to="/task/list">
          <Button type="primary">返回</Button>
        </Link>
      </div>
    );
  }
}

export default TaskDetail;
