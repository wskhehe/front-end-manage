const send = require('koa-send');
const path = require('path');
const fs = require('fs');
const Validator = require('../utils/validator');

exports.download = async (ctx, next) => {
  const fileName = ctx.params.filename;
  const filePath = path.join(__dirname, `../public/${fileName}`);
  const exists = await fs.existsSync(filePath);
  if (exists) {
    ctx.attachment(fileName);
    await send(ctx, fileName, { root: __dirname + '../public' });
  } else {
    ctx.throw(404);
  }
};
exports.upload = async (ctx, next) => {
  if (ctx.request.body.files) {
    // 返回上传成功后的临时路径
    const files = ctx.request.body.files;
    let resultPath = {};
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const fp = files[key].path;
        resultPath[key] = fp.substring(fp.lastIndexOf('\\') + 1);
      }
    }
    ctx.body = {
      status: 0,
      data: resultPath,
      message: '上传成功'
    };
  } else {
    ctx.body = {
      status: 1,
      message: '上传失败'
    };
  }
};
