import React, { Component } from 'react';
import Validator from '@/utils/validator';
import axios from '@/utils/axios';
import api from '@/api/base.api';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
import './Login.css';
import logo from '@/assets/react-logo.svg';

class Login extends Component {
  state = {
    account: localStorage.getItem('account') || '',
    password: localStorage.getItem('password') || '',
    remember: localStorage.getItem('remember') === 'true' ? true : false
  };
  componentWillMount() {}
  handleCheckAccout = (rule, value, callback) => {
    if (!Validator.phone(value)) {
      callback('手机号码不合规则');
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let result = await axios.post(api.login, values);
        localStorage.setItem('Authorization', result.data);
        if (values.remember) {
          localStorage.setItem('remember', values.remember);
          localStorage.setItem('account', values.account);
          localStorage.setItem('password', values.password);
        }
        this.props.history.push('/dashboard');
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-content">
        <h1>登录</h1>
        <img src={logo} className="app-logo" alt="logo" />
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('account', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              initialValue: this.state.remember ? this.state.account : '',
              rules: [
                { required: true, message: '请输入用户名!' },
                {
                  validator: this.handleCheckAccout
                }
              ]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                autoComplete="off"
                placeholder="请输入用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入用户密码!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                autoComplete="off"
                placeholder="请输入用户密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <div className="text-c">
              or <a href="">马上注册!</a>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;
