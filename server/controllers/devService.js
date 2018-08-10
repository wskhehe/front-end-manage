const conn = require('../db/DBConfig');
const userSql = require('../db/userSql');

exports.add = async (ctx, next) => {
  let params = [];
  params.push(ctx.request.body.name);
  params.push(ctx.request.body.sex);

  console.log(ctx.query);
  console.log(ctx.request.body);

  let result = await conn.query(userSql.insert, params);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      code: result.error.errno,
      message: result.error.sqlMessage
    };
  } else {
    ctx.response.body = {
      status: 0,
      message: '注册成功'
    };
  }
};

exports.query = async (ctx, next) => {
  let result = await conn.query(userSql.queryAll);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      code: result.error.errno,
      message: result.error.sqlMessage
    };
  } else {
    ctx.response.body = {
      status: 0,
      message: 'success',
      data: result
    };
  }
};
