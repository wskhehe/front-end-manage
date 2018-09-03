import React, { Component } from 'react';
import { Button } from 'antd';
import './TaskList.css';
import './TaskTest.less';

class TaskList extends Component {
  componentWillMount() {
    // console.log(this.props);
  }
  handleListClick = () => {
    this.props.history.push('/task/detail');
  };
  render() {
    return (
      <div className="tasklist-page">
        <h1>任务列表</h1>
        <div className="app-title">
          <span className="color">这里使用了postcss语法</span>
        </div>
        <div className="app-desc">我的样式来自less</div>
        <Button type="primary" onClick={this.handleListClick.bind(this)}>
          看详情
        </Button>
      </div>
    );
  }
}

export default TaskList;
