const WXconfig = require('./WXconfig');
const menuData = require('./menu');
// const OAuth = require('wechat-oauth');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
// const client = new OAuth('your appid', 'your secret');
const WXBizDataCrypt = require('./WXBizDataCrypt');
const request = require('request');

// 微信认证管理相关

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFile = (token, path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, token, err => {
      if (err) reject(err);
      else {
        console.log('saved new token:', token);
        resolve(token);
      }
    });
  });
};
const getRemoteToken = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        let token = response.data;
        let now = new Date().getTime();
        // minus 30s delay
        token.expire_time = now + 7000 * 1000;
        console.log('returned from remote:', token);
        resolve(token);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const isValidToken = token => {
  if (!token || !token.access_token || !token.expire_time) return false;
  let now = new Date().getTime();
  if (now < token.expire_time) return true;
  return false;
};
const getAccessToken = async (ctx, next) => {
  let token = await readFile(path.join(__dirname, './access_token.txt'));
  token = JSON.parse(token);
  if (isValidToken(token)) {
    return token;
  } else {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${
      WXconfig.appid
    }&secret=${WXconfig.secret}`;

    token = await getRemoteToken(url);
    await writeFile(JSON.stringify(token), path.join(__dirname, './access_token.txt'));
    return token;
  }
};
// 公众号创建菜单
exports.createMenu = async (ctx, next) => {
  const access_token = await getAccessToken();
  const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${
    access_token.access_token
  }`;

  const result = await new Promise((resolve, reject) => {
    axios
      .post(url, menuData)
      .then(response => {
        if (response.data.errcode != 0) {
          resolve({
            status: 1,
            message: '创建失败',
            data: response.data
          });
        } else {
          resolve({
            status: 0,
            message: '创建成功',
            data: response.data
          });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
  ctx.response.body = result;
};
