import axios from 'axios';
import envconfig from '@/config/config';
import { Message } from 'antd';
import Store from '@/store/store';
const { dispatch } = Store;

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.baseURL = envconfig.baseURL;
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization') || '';

//请求发出拦截器
var loading;
//loading计数器
let loadingCount = 0;
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('Authorization') || '';
    //静默加载 不添加loading
    if (!config.silence) loadingCount++;
    if (loadingCount > 0) {
      //添加loading
      dispatch({
        type: 'SETLOADING',
        value: true
      });
    }
    return config;
  },
  error => {
    Message.error('请求参数配置错误');
    return Promise.reject(error);
  }
);

//请求响应拦截器
axios.interceptors.response.use(
  res => {
    // 关闭loaading
    if (!res.config.silence) loadingCount--;
    if (!loadingCount) {
      // 间隔300毫秒内的loading合并
      setTimeout(() => {
        if (!res.config.silence) {
          // 关闭loading
          dispatch({
            type: 'SETLOADING',
            value: false
          });
        }
      }, 300);
    }
    if (res.data) {
      // backself 如果此响应需要页面自己处理 请设置backself为true
      // 否则这会拦截所有status != 0的响应 并抛出Message
      if (res.data.status != 0) {
        if (res.data.status == 401) {
          Message.error('登录信息失效');
          localStorage.removeItem('Authorization');
          localStorage.removeItem('trade_currentData');
          window.location.hash = '#/passport/login';
          return Promise.reject(res.data.message);
        } else {
          if (res.config.backself) {
            return res.data;
          } else {
            if (!res.config.backself) Message.error(res.data.message);
            return Promise.reject(res.data.message);
          }
        }
      } else {
        return res.data;
      }
    } else {
      Message.error('服务器未响应数据');
      return Promise.reject('服务器未响应数据');
    }
  },
  error => {
    // 关闭loaading
    if (loadingCount != 0) loadingCount--;
    if (loadingCount == 0) {
      dispatch({
        type: 'SETLOADING',
        value: false
      });
    }
    let message = '';
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message = '错误的请求';
          break;
        case 401:
          localStorage.removeItem('Authorization');
          localStorage.removeItem('trade_currentData');
          window.location.hash = '#/passport/login';
          break;
        case 403:
          message = '请求资源无权访问';
          break;
        case 404:
          message = '请求资源不存在';
          break;
        case 500:
          message = '服务器错误';
          break;
        case 504:
          message = '网关超时';
          break;
        default:
          message = '请求资源无权访问' + error.response.status;
          break;
      }
      console.log(error.response);
      if (message) Message.error(message);
      return Promise.reject(error.response.data || '请求异常');
    } else if (error.request) {
      console.log(error);
      console.log(error.request);
      console.log(error.config);
      // 已正常发出请求 但未收到响应
      if (error.message == 'Network Error') {
        // Network Error
        Message.error('无法连接服务器，请检查您的网络连接或联系客服');
        return Promise.reject('无法连接服务器，请检查您的网络连接或联系客服');
      } else if (error.message.indexOf('timeout of') > -1) {
        // timeout of 1000ms exceeded
        Message.error('客户端请求超时');
        return Promise.reject('客户端请求超时');
      } else {
        Message.error('未收到响应');
        return Promise.reject('未收到响应');
      }
    } else {
      // 请求未发出就已报错  前端请求配置出问题
      console.log(error);
      console.log(error.config);
      Message.error('无效的请求');
      return Promise.reject('无效的请求');
    }
  }
);

export default axios;
