// 配置文件
const NODE_ENV = process.env.NODE_ENV;
console.log('this node_env is ' + NODE_ENV);

let config = {};
// 内网配置
const devconfig = {
  baseURL: 'http://192.168.11.82:3100/qiaodev',
  someConfig: 'dev'
};

// 测试配置
const testconfig = {
  baseURL: 'http://120.31.131.193:8140/trade',
  someConfig: 'test'
};

// 生产配置
const propconfig = {
  baseURL: 'http://120.131.82.40:8205/trade',
  someConfig: 'prop'
};

// 根据环境变量 导出对应配置
if (NODE_ENV === 'development') {
  // 方便后台开发者内网调试访问自己的机器
  const myb_host = localStorage.getItem('fem_host') || '';
  // const myb_host = 'http://192.168.11.95:8080'; //吴贝
  // const myb_host = 'http://192.168.11.71:8082/trade'; //徐航
  if (myb_host) devconfig.baseURL = myb_host;

  config = devconfig;

  // 内网直连测试服务器
  if (process.argv[0] === 'testserver') {
    config = testconfig;
    config.baseURL = 'http://120.31.131.193:8140/trade';
  }
  // 内网直连正式服务器
  if (process.argv[0] === 'proserver') {
    config = propconfig;
    config.baseURL = '/proserver';
  }
} else if (NODE_ENV === 'testing') {
  config = testconfig;
} else {
  config = propconfig;
}

export default config;
