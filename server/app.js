const Koa = require('koa');
var cors = require('koa2-cors');
const koaBody = require('koa-body');
const staticServer = require('koa-static');
const logs = require('./utils/log_util');
// const https = require('https');
const path = require('path');
const fs = require('fs');
const config = require('./config/config');

const app = new Koa();

// 开启cors 允许跨域
app.use(cors());

// 处理错误中间件
const errorHandler = async (ctx, next) => {
  const startTime = new Date().getTime(); // 请求开始时间
  try {
    await next();
    const endTime = new Date().getTime(); // 请求响应结束时间
    // 记录接口请求错误日志  资源请求不记录
    const originalUrl = ctx.request.originalUrl;
    if (originalUrl.indexOf(config.serverBaseurl) == 0) {
      if (ctx.response.body) {
        if (ctx.response.body.status != 0) {
          // status == 1 此类错误可以不记录日志 所有信息已response到前台
          logs.error(ctx, startTime, endTime);
        }
      } else {
        ctx.response.body = {
          status: 1,
          message: '服务器异常',
          data: '服务端未响应数据,请联系管理员'
        };
        logs.error(ctx, startTime, endTime);
      }
    }
  } catch (err) {
    // 捕捉到异常 也要完成响应
    ctx.response.body = {
      status: 1,
      message: '服务器异常',
      data: error.message
    };
    const endTime = new Date().getTime(); // 请求响应结束时间
    // 释放异常 才能完成整个请求 下面监听error 记录错误日志
    ctx.app.emit('error', err, ctx, startTime, endTime);
  }
};
app.use(errorHandler);

// 使用koaBody中间件 并设置可接受文件 限制大小
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  })
);

// 页面路由 由服务端控制渲染(注意区分 这跟静态资源访问不同)
// const views = require('./routes/views');
// app.use(views.routes());

// 以下是服务端路由 每个模块对应一个文件
const mock = require('./routes/mock');
const setting = require('./routes/setting');
const devService = require('./routes/devService');
const fileService = require('./routes/fileService');
// const WXService = require('./routes/WXService');
app.use(mock.routes());
app.use(setting.routes());
app.use(devService.routes());
app.use(fileService.routes());
// app.use(WXService.routes());

// 页面路由 静态资源方式 直接访问
app.use(staticServer(path.join(__dirname, './public')));

// 输出错误信息
app.on('error', (err, ctx, startTime, endTime) => {
  logs.error(ctx, startTime, endTime, err);
});

const port = process.env.PORT || '3100';

// 启动服务监听
app.listen(port);

// 配置https证书文件
const options = {
  key: fs.readFileSync('./ssl/214674797820646.key'),
  cert: fs.readFileSync('./ssl/214674797820646.pem')
};
// 启用https
// https.createServer(options, app.callback()).listen(443);
console.log(`server listening on ${port} for http`);
// console.log(`server listening on 443 for https`);
