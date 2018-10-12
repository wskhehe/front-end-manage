import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Tag, Button } from 'antd';
import axios from '@/utils/axios';
import api from '@/api/setting.api';

const { Column } = Table;
import './DictList.css';

class DictList extends Component {
  state = {
    dataSource: []
  };
  async componentWillMount() {
    let result = await axios.post(api.getDict);
    if (result) {
      this.setState({ dataSource: result.data.list });
    }
  }
  handleAddDict() {}
  render() {
    return (
      <div>
        <Link to="/setting/dictadd">
          <Button type="primary" onClick={this.handleAddDict}>
            添加字典
          </Button>
        </Link>
        <Table dataSource={this.state.dataSource} rowKey={record => record.id}>
          <Column title="标签名" dataIndex="label" key="label" />
          <Column title="标签值" dataIndex="value" key="value" />
          <Column title="类型" dataIndex="type" key="type" />
          <Column title="描述" dataIndex="desc" key="desc" />
          <Column title="备注" dataIndex="remarks" key="remarks" />
          <Column title="排序" dataIndex="sort" key="sort" />
          <Column
            title="操作"
            key="id"
            render={(text, record) => (
              <span>
                <a href="javascript:;">编辑 {record.lastName}</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}
export default DictList;
