var log4js = require('log4js');

var log_config = require('./log_config');

//加载配置文件
log4js.configure(log_config);

var logUtil = {};

var errorLogger = log4js.getLogger('error');
var infoLogger = log4js.getLogger('info');

//封装错误日志
logUtil.error = (ctx, error, startTime, endTime) => {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, startTime, endTime));
  }
};

//封装普通日志
logUtil.info = function(ctx, startTime, endTime) {
  if (ctx) {
    infoLogger.info(formatInfo(ctx, startTime, endTime));
  }
};
//格式化普通日志
var formatInfo = function(ctx, startTime, endTime) {
  var logText = new String();

  //日志信息开始
  logText += '\n' + '*************** response log start ***************' + '\n';

  //添加请求头信息
  logText += formatResponse(ctx.request, startTime, endTime);

  //响应状态码
  logText += 'response status: ' + ctx.status + '\n';

  //响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';

  //响应日志结束
  logText += '*************** response log end ***************' + '\n';

  return logText;
};

//格式化错误日志
var formatError = function(ctx, err, startTime, endTime) {
  var logText = new String();

  //错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n';

  //添加请求头信息
  logText += formatResponse(ctx.request, startTime, endTime);

  //错误名称
  logText += 'err name: ' + err.name + '\n';
  //错误信息
  logText += 'err message: ' + err.message + '\n';
  //错误详情
  logText += 'err stack: ' + err.stack + '\n';

  //错误信息结束
  logText += '*************** error log end ***************' + '\n';

  return logText;
};

//格式化客户端请求头信息
var formatResponse = function(req, startTime, endTime) {
  var logText = new String();

  var method = req.method;
  //错误ID
  logText += 'request id: ' + startTime + '\n';

  //访问方法
  logText += 'request method: ' + method + '\n';

  //请求原始地址
  logText += 'request originalUrl:  ' + req.originalUrl + '\n';

  //客户端ip
  logText += 'request client ip:  ' + req.ip + '\n';

  //请求时间
  logText += 'request startTime:  ' + startTime + '\n';

  //请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
  } else {
    logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
  }
  //服务器响应时间
  logText += 'response time: ' + (endTime - startTime) + '\n';

  return logText;
};

module.exports = logUtil;
