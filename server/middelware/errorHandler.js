const logs = require('../utils/log_util');
const config = require('../config/config');
module.exports = async (ctx, next) => {
  const startTime = new Date().getTime(); // 请求开始时间
  try {
    await next();
    const endTime = new Date().getTime(); // 请求响应结束时间
    // 记录接口请求错误日志  资源请求不记录
    const originalUrl = ctx.request.originalUrl;
    if (originalUrl.indexOf(config.serverBaseUrl) == 0) {
      if (ctx.response.body) {
        if (ctx.response.body.status != 0) {
          // status == 1 此类错误可以不记录日志 所有信息已response到前台

          // sql错误服务器记录日志 但不要抛出详细信息到前台
          let sqlError = null;
          if (ctx.response.body.sqlError) {
            sqlError = ctx.response.body.sqlError;
            ctx.response.body = {
              status: 1,
              message: '服务器异常'
            };
          }
          logs.error(ctx, startTime, endTime, sqlError);
        }
      } else {
        let is404 = true;
        router.stack.forEach(element => {
          if (element.path == ctx.request.url) {
            is404 = false;
          }
        });
        if (!is404 && ctx.status == 404) {
          ctx.response.body = {
            status: 1,
            message: '服务端未响应数据'
          };
        }
        logs.error(ctx, startTime, endTime, null);
      }
    }
  } catch (err) {
    // 捕捉到异常 也要完成响应
    if (err.statusCode == 401) {
      ctx.response.body = {
        status: 401,
        message: 'token校验失败'
      };
    } else {
      ctx.response.body = {
        status: 1,
        message: '服务器异常'
      };
    }
    const endTime = new Date().getTime(); // 请求响应结束时间
    // 释放异常 才能完成整个请求 下面监听error 记录错误日志
    ctx.app.emit('error', err, ctx, startTime, endTime);
  }
};
