const conn = require('../db/DBConfig');
const Sql = require('../db/passportSql');
const Validator = require('../utils/validator');
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * @apiDefine passport 通行证
 */

/**
 *
 * @api {post} /passport/login 登录
 * @apiName login
 * @apiGroup passport
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} account 用户名
 * @apiParam  {String} password 密码
 *
 * @apiSuccess {Number} status 0
 * @apiSuccess {String} message 登录成功
 * @apiSuccess {String} data token
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'登录成功',
 *     data:'asdqwdqwdqwd2109389021ujhnfksajhgf8'
 * }
 *
 *
 */
exports.login = async (ctx, next) => {
  const rules = {
    account: [{ required: true, type: 'string', min: 1, max: 20, message: 'invalid account' }],
    password: [{ required: true, type: 'string', min: 1, max: 32, message: 'invalid password' }]
  };
  const valiResult = await Validator.validator(ctx.request.body, rules);
  if (valiResult) {
    ctx.response.body = {
      status: 1,
      message: '用户名或密码错误',
      data: valiResult
    };
    return;
  }
  let result = await conn.query(Sql.checkAccount, [
    ctx.request.body.account,
    ctx.request.body.password
  ]);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      code: result.error.errno,
      message: result.error.sqlMessage
    };
  } else {
    if (result.length > 0) {
      // 根据用户名和密码生成token
      const token = jwt.sign(
        {
          id: ctx.request.body.account,
          secret: ctx.request.body.password
        },
        config.secret,
        { expiresIn: 36000 }
      );
      ctx.response.body = {
        status: 0,
        message: '登录成功',
        data: `Bearer ${token}`
      };
    } else {
      ctx.response.body = {
        status: 1,
        message: '用户名或密码错误'
      };
    }
  }
};
