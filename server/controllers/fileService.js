const send = require('koa-send');
const path = require('path');
const fs = require('fs');

exports.download = async (ctx, next) => {
  const fileName = ctx.params.filename;
  const filePath = path.join(__dirname, `/download/${fileName}`);
  const exists = await fs.existsSync(filePath);
  if (exists) {
    ctx.attachment(fileName);
    await send(ctx, fileName, { root: __dirname + '/download' });
  } else {
    ctx.throw(404);
  }
};
exports.upload = async (ctx, next) => {
  const file = ctx.request.body.files.upfile; // 获取上传文件
  const reader = fs.createReadStream(file.path); // 创建可读流
  const ext = file.name.split('.').pop(); // 获取上传文件扩展名
  const upStream = fs.createWriteStream(`${__dirname}/upload/${file.name}`); // 创建可写流
  reader.pipe(upStream); // 可读流通过管道写入可写流

  ctx.body = {
    status: 0,
    msg: '上传成功'
  };
};
