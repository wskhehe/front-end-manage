const fs = require('fs');
const path = require('path');

exports.hello = async (ctx, next) => {
  const name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};
exports.indexs = async (ctx, next) => {
  ctx.response.type = 'html';
  const html = path.join(__dirname, '../public/index.html');
  ctx.response.body = await fs.readFileSync(html, 'utf8');
};
exports.about = async (ctx, next) => {
  ctx.response.type = 'html';
  const html = path.join(__dirname, '../public/about.html');
  ctx.response.body = await fs.readFileSync(html, 'utf8');
};
exports.upload = async (ctx, next) => {
  ctx.response.type = 'html';
  const html = path.join(__dirname, '../public/upload.html');
  ctx.response.body = await fs.readFileSync(html, 'utf8');
};
