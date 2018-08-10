var conn = require('../../db/DBConfig');
var usql = require('../../db/userSql');
// 微信数据请求接口

// 查询 该手机号码是否已注册
exports.queryWXuser = async (ctx, next) => {
  let params = [];
  // 获取get参数
  params.push(ctx.query.phone);
  let result = await conn.query(userSql.selectWXuser, params);
  console.log(result);
  ctx.response.body = {
    status: 0,
    message: '注册成功'
  };
};

// 查询 该openId是否已注册 如果注册了 更新用户信息
exports.queryWXuserOpenid = async (ctx, next) => {
  let params = [];
  params.push(ctx.request.body.openId);
  console.log(ctx.request.body);

  let result = await conn.query(usql.selectWXuserOpenid, params);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      code: result.error.errno,
      message: result.error.sqlMessage
    };
  } else {
    params = [];
    params.push(ctx.request.body.avatarUrl);
    params.push(ctx.request.body.city);
    params.push(ctx.request.body.country);
    params.push(ctx.request.body.gender);
    params.push(ctx.request.body.language);
    params.push(ctx.request.body.nickName);
    params.push(ctx.request.body.province);
    params.push(ctx.request.body.openId);

    let rtn = await conn.query(usql.updateWXuser, params);
    if (rtn.error) {
      ctx.response.body = {
        status: 1,
        code: rtn.error.errno,
        message: rtn.error.sqlMessage
      };
    } else {
      if (rtn.affectedRows == 0) {
        ctx.response.body = {
          status: 0,
          code: 102,
          message: '没有该用户'
        };
      } else {
        ctx.response.body = {
          status: 0,
          message: '用户信息更新成功',
          data: rtn[0]
        };
      }
    }
  }
};

// 插入新成员
exports.addWXuser = async (ctx, next) => {
  let params = [];
  // 获取post参数
  params.push(ctx.request.body.openId);
  params.push(ctx.request.body.name);
  params.push(ctx.request.body.phone);
  params.push(ctx.request.body.avatarUrl);
  params.push(ctx.request.body.city);
  params.push(ctx.request.body.country);
  params.push(ctx.request.body.gender);
  params.push(ctx.request.body.language);
  params.push(ctx.request.body.nickName);
  params.push(ctx.request.body.province);
  let result = await conn.query(usql.insertWXuser, params);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      code: result.error.errno,
      message: result.error.sqlMessage
    };
  } else {
    ctx.response.body = {
      status: 0,
      code: 106,
      message: '签到成功'
    };
  }
};
