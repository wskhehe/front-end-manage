const Koa = require('koa');
var cors = require('koa2-cors');
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const staticServer = require('koa-static');
const compress = require('koa-compress');
const jwtKoa = require('koa-jwt');
const logs = require('./utils/log_util');
// const https = require('https');
const path = require('path');
const fs = require('fs');
const config = require('./config/config');

const app = new Koa();
const router = new koaRouter({ prefix: config.serverBaseUrl });
// 开启cors 允许跨域
app.use(cors());

// 开启GZIP
app.use(compress({ threshold: 2048 }));

// 处理错误中间件
const errorHandler = async (ctx, next) => {
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

          let sqlError = null;
          if (ctx.response.body.sqlError) {
            // sql错误服务器记录日志 但不要抛出详细信息到前台
            sqlError = ctx.response.body.sqlError;
            ctx.response.body = {
              status: 1,
              message: ctx.response.body.message
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
        message: 'token校验失败',
        data: err.message
      };
    } else {
      ctx.response.body = {
        status: 1,
        message: '服务器异常',
        data: err.message
      };
    }
    const endTime = new Date().getTime(); // 请求响应结束时间
    // 释放异常 才能完成整个请求 下面监听error 记录错误日志
    ctx.app.emit('error', err, ctx, startTime, endTime);
  }
};
app.use(errorHandler);

// 页面路由 静态资源方式 直接访问
app.use(staticServer(path.join(__dirname, '/public')));

// // jwt中间件
// app.use(
//   jwtKoa({ secret: config.secret }).unless({
//     // useOriginalUrl: false,
//     path: [
//       `${config.serverBaseUrl}/passport/login`,
//       `${config.serverBaseUrl}/passport/register`,
//       `${config.serverBaseUrl}/upload`,
//       `${config.serverBaseUrl}/download`,
//       `${config.serverBaseUrl}/mock`,
//       /^\/views/,
//       /^\/public/,
//       /^\/apidoc/
//     ] //数组中的路径不需要通过jwt验证
//   })
// );
// 使用koaBody中间件 并设置可接受文件文件上传
app.use(
  koaBody({
    multipart: true,
    // encoding: 'gzip',
    formidable: {
      maxFileSize: 10 * 1024 * 1024, // 设置上传文件大小最大限制，默认10M
      uploadDir: path.join(__dirname, config.uploadtemp), // 文件临时存放目录
      keepExtensions: true,
      onFileBegin: (name, file) => {
        // 检查文件夹是否存在如果不存在则新建文件夹
        const dir = path.join(__dirname, config.uploadtemp);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
      }
    }
  })
);

// 页面路由 由服务端控制渲染(注意区分 这跟静态资源访问不同)
// const views = require('./routes/views');
// app.use(views.routes());

// 以下是服务端路由 每个模块对应一个文件
const mock = require('./routes/mock');
const common = require('./routes/common');
const passport = require('./routes/passport');
const setting = require('./routes/setting');
const employee = require('./routes/employee');
const task = require('./routes/task');
app.use(mock(router).routes());
app.use(common(router).routes());
app.use(passport(router).routes());
app.use(setting(router).routes());
app.use(employee(router).routes());
app.use(task(router).routes());
app.use(router.allowedMethods());

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
