const send = require('koa-send');
const path = require('path');
const fs = require('fs');

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

  // const file = ctx.request.body.files.upfile; // 获取上传文件
  // const reader = fs.createReadStream(file.path); // 创建可读流
  // const upStream = fs.createWriteStream(`${__dirname}/upload/${file.name}`); // 创建可写流
  // reader.pipe(upStream); // 可读流通过管道写入可写流

  // ctx.body = {
  //   status: 0,
  //   message: '上传成功'
  // };
};

const uploader = require('../utils/uploader');
exports.saveUploadFile = async (ctx, next) => {
  const fname = 'upload_3d8ab9603e4c7f29aca7ecd0784562e6.PNG';
  let result = await uploader.saveUploadFile(fname);
  if (result.status == 0) {
    ctx.response.body = {
      status: 0,
      message: 'success',
      data: result.data
    };
  } else {
    ctx.response.body = {
      status: 1,
      message: result.message,
      data: result.data
    };
  }
};
