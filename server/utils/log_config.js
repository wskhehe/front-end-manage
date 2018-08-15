var path = require('path');

//错误日志输出路径
var errorLogPath = path.resolve(__dirname, '../logs/error');

//普通日志输出路径
var infoLogPath = path.resolve(__dirname, '../logs/log');

module.exports = {
  // 定义各种输出模式
  appenders: {
    // 控制台输出
    console: {
      type: 'stdout'
    },
    // 普通信息日志 以文件形式输出
    // info: {
    //   type: 'dateFile',
    //   filename: infoLogPath,
    //   pattern: '-yyyy-MM-dd.log',
    //   alwaysIncludePattern: true
    // },
    // 错误信息日志 以文件形式输出
    error: {
      type: 'dateFile',
      filename: errorLogPath,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    // 没有找到对应loger时会使用default
    // appenders使用上面哪几种输入模式
    default: { appenders: ['console', 'error'], level: 'debug' },
    error: { appenders: ['error'], level: 'error' },
    // info: { appenders: ['info'], level: 'info' },
    console: { appenders: ['console'], level: 'info' }
  }
};
