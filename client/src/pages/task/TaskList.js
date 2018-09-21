import React, { Component } from 'react';
import { Button } from 'antd';
import axios from '@/utils/axios';
import api from '@/api/task.api';

import './TaskList.css';
import './TaskTest.less';

class TaskList extends Component {
  state = {
    tableData: {}
  };
  componentWillMount() {
    // console.log(this.props);
  }
  handleGetList = async () => {
    let result = await axios.post(api.getTaskList);
    this.setState({ tableData: result.data });
  };
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
        <Button type="primary" onClick={this.handleGetList}>
          查询数据列表
        </Button>
        <Button className="ml-10" type="primary" onClick={this.handleListClick.bind(this)}>
          去详情
        </Button>
        <div>
          列表数据：
          {JSON.stringify(this.state.tableData)}
        </div>
      </div>
    );
  }
}

export default TaskList;
