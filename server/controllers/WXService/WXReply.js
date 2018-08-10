const wechat = require('co-wechat');
var WXconfig = require('./WXconfig');

module.exports = wechat(WXconfig).middleware(async (message, ctx) => {
  console.log(message);
  return '';
});
