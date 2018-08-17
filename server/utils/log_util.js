var log4js = require('log4js');

var log_config = require('./log_config');

//加载配置文件
log4js.configure(log_config);

var logUtil = {};

var logger = log4js.getLogger('error');

//封装错误日志
logUtil.error = (ctx, startTime, endTime, error) => {
  if (ctx) {
    logger.error(formatError(ctx, startTime, endTime, error));
  }
};

//格式化错误日志
var formatError = function(ctx, startTime, endTime, error) {
  var logText = new String();
  var method = ctx.request.method;
  //编号
  logText += '\n' + 'request id: ' + (ctx.request.header.requestid || '') + '\n';
  //访问方法
  logText += 'request method: ' + ctx.request.method + '\n';
  //请求原始地址
  logText += 'request originalUrl:  ' + ctx.request.originalUrl + '\n';
  //客户端ip
  logText += 'request client ip:  ' + ctx.request.ip + '\n';
  //请求时间
  logText += 'request startTime:  ' + startTime + '\n';
  //请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(ctx.request.query) + '\n';
  } else {
    logText += 'request body: ' + '\n' + JSON.stringify(ctx.request.body) + '\n';
  }
  //响应状态码
  logText += 'response status: ' + ctx.response.status + '\n';
  //响应时间
  logText += 'response timeDiff: ' + (endTime - startTime) + '\n';
  //响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.response.body) + '\n\n';

  if (error) {
    //错误名称
    logText += 'error name: ' + error.name + '\n';
    //错误信息
    logText += 'error message: ' + error.message + '\n';
    //错误栈
    logText += 'error stack: ' + error.stack + '\n';
    //如果是sql错误 记录相关信息
    if (error.sql) {
      logText += 'error code:: ' + error.code + '\n';
      logText += 'error errno: ' + error.errno + '\n';
      logText += 'error sqlMessage: ' + error.sqlMessage + '\n';
      logText += 'error sqlState: ' + error.sqlState + '\n';
      logText += 'error index: ' + error.index + '\n';
      logText += 'error sql: ' + error.sql + '\n';
    }
  }

  return logText;
};

module.exports = logUtil;
