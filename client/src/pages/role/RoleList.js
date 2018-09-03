import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveFormData, saveImg, clearData, saveFormDataAll } from '@/store/role/action';
import { setLoading, saveProduction } from '@/store/global/action';
import { Button } from 'antd';
import './RoleList.css';

@connect(
  (state) => state,
  {
    saveFormData,
    saveFormDataAll,
    saveImg,
    clearData,
    setLoading,
    saveProduction
  }
)
class RoleList extends Component {
  state = {
    num: 1
  };
  // 绑定事件需要注意this指针
  handleClick(name, e) {
    console.log(name); // 自定义参数
    console.log(e); // 浏览器事件对象
    this.props.saveFormData('18671451730', 'phoneNo');
  }
  handleClick2(name, e) {
    this.props.saveFormDataAll({
      orderSum: '120',
      name: '乔',
      phoneNo: '18671451730',
      imgpath: './img/logo.png'
    });
  }
  // 箭头函数可以不绑定this
  handleClick3 = () => {
    this.props.setLoading(true);
  };
  handleClick4 = () => {
    this.props.saveProduction();
  };
  render() {
    return (
      <div>
        <h1>我是role</h1>
        <div>
          <span className="role-color">我是redux中的数据:</span>
          {JSON.stringify(this.props)}
        </div>
        <div className="mt-10">
          <Button type="primary" onClick={this.handleClick.bind(this, 'canshu1')}>
            单项修改
          </Button>
          <Button className="ml-10" type="primary" onClick={this.handleClick2.bind(this, 'canshu2')}>
            全部修改
          </Button>
          <Button className="ml-10" type="primary" onClick={this.handleClick3}>
            修改全局state 设置loading
          </Button>
          <Button className="ml-10" type="primary" onClick={this.handleClick4}>
            异步redux
          </Button>
        </div>
      </div>
    );
  }
}
export default RoleList;
