import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './layout.css';

const { Header, Sider, Content } = Layout;
@connect((state) => state)
class SiderDemo extends Component {
  state = {
    collapsed: false
  };
  componentWillMount() {
    // console.log(this.props);
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout className="fem-layout">
        <Header className="fem-layout-header">
          <div className="header-logo">
            <img src={require('../assets/img/logo.png')} alt="" />
          </div>
          <div className="header-logo-name">sjb react</div>
          <div className="fem-header-right">
            <div>some item</div>
            <div className="header-notice">
              <Icon type="bell" />
            </div>
            <div className="avatar">
              <img src={require('../assets/img/cat.png')} alt="" />
            </div>
          </div>
        </Header>
        <Layout>
          <Sider className="fem-layout-sider" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <Menu mode="inline" defaultSelectedKeys={[this.props.menuActive]}>
              <Menu.Item key="1">
                <Link to="/dashboard">
                  <Icon type="area-chart" />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/task">
                  <Icon type="video-camera" />
                  <span>任务管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/role">
                  <Icon type="team" />
                  <span>人员管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/setting">
                  <Icon type="setting" />
                  <span>系统设置</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/mycenter">
                  <Icon type="user" />
                  <span>个人中心</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content className="fem-layout-content">{this.props.children}</Content>
          </Layout>
        </Layout>
        {/* <Footer>sijibao</Footer> */}
      </Layout>
    );
  }
}

export default SiderDemo;
