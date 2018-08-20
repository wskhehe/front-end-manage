const send = require('koa-send');
const path = require('path');
const fs = require('fs');
const Validator = require('../utils/validator');

/**
 * @apiDefine common 公用接口
 */

/**
 *
 * @api {post} /common/validator 参数校验示例
 * @apiName validator
 * @apiGroup common
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {String} id 编号 5位字符串
 * @apiParam  {String} name 姓名 3-10位字符串
 * @apiParam  {String} age  年龄 10-30整数
 * @apiParam  {String} phone  手机号码 中国大陆手机号码
 * @apiParam  {String} dcount  采购数量 10-30的数字 最多2位小数
 * @apiParam  {String} iadmin  是否管理员 boolean类型
 * @apiParam  {String} enum  枚举类型 必须是['admin', 'user', 'guest']之中的一个
 * @apiParam  {String} [desc] 描述 5字以内字符串
 *
 * @apiSuccess {Number} status 0
 * @apiSuccess {String} message 添加成功
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'注册成功'
 * }
 *
 *
 */
exports.validator = async (ctx, next) => {
  let rules = {
    id: [
      { required: true, message: 'id 不能为空' },
      {
        type: 'string',
        len: 5,
        message: 'id 只能是5位数',
        transform(value) {
          return value.toString();
        }
      }
    ],
    name: [
      { required: true, message: '姓名不能为空' },
      {
        type: 'string',
        min: 3,
        max: 10,
        message: '姓名长度必须是3-10位',
        transform: (value = '') => value.toString()
      }
    ],
    age: [
      { required: true, message: '年龄不能为空' },
      { type: 'integer', message: '年龄必须是整数' },
      { type: 'integer', min: 10, max: 30, message: '年龄必须是10-30之间' }
    ],
    phone: [
      { required: true, message: '手机号码不能为空' },
      {
        type: 'string',
        pattern: /^1[0-9]{10}$/,
        message: '手机号码不合规则',
        transform: (value = '') => value.toString()
      }
    ],
    // type:number或float  12.0 12.00这类数字无法通过
    // https://github.com/yiminghe/async-validator/issues/101
    dcount: [
      { required: true, message: '采购数量不能为空' },
      { type: 'number', message: '采购数量必须是数字' },
      { type: 'number', min: 10, max: 30, message: '采购数量必须是10-30之间' },
      {
        type: 'number',
        validator: (rule, value, callback) => {
          if (!Validator.isNumber(value, false, 2)) {
            return callback(new Error(rule.message));
          } else {
            callback();
          }
        },
        message: '采购数量最多2位小数'
      }
    ],
    iadmin: [{ type: 'boolean', message: '请选择是否是管理员' }],
    desc: [
      {
        type: 'string',
        min: 0,
        max: 5,
        message: '描述最多5字以内',
        transform: (value = '') => value.toString()
      }
    ],
    enum: [
      { required: true, message: '进度不能为空' },
      {
        type: 'enum',
        enum: ['admin', 'user', 'guest'],
        message: "进度必须是['admin', 'user', 'guest']之中的一个"
      }
    ]
  };
  const valiResult = await Validator.validator(ctx.request.body, rules);
  if (valiResult) {
    ctx.response.body = {
      status: 1,
      message: '参数错误',
      data: valiResult
    };
  } else {
    ctx.response.body = {
      status: 0,
      message: '注册成功'
    };
  }
};

/**
 *
 * @api {post} /common/upload 文件上传
 * @apiName upload
 * @apiGroup common
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {File} file 文件
 *
 * @apiSuccess {Number} status 0
 * @apiSuccess {String} message 添加成功
 * @apiSuccess {String} data 文件临时路径
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'上传成功',
 *     data:'20180816/15344145686181005.png'
 * }
 *
 *
 */
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
      message: '未接受到文件内容'
    };
  }
};

/**
 *
 * @api {get} /common/download 文件下载
 * @apiName download
 * @apiGroup common
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 * @apiDeprecated
 * 服务端返回文件流下载
 * 另一种方式 直接访问public资源下载
 *
 *
 * @apiParam  {String} filename 文件名
 *
 *
 *
 */
exports.download = async (ctx, next) => {
  const fileName = ctx.query.filename || '';
  if (!fileName) {
    ctx.response.body = {
      status: 1,
      message: '参数错误'
    };
    return;
  }
  const filePath = path.join(__dirname, `../public/${fileName}`);
  const exists = await fs.existsSync(filePath);
  console.log(exists);
  if (exists) {
    ctx.attachment(fileName);
    await send(ctx, fileName, { root: path.join(__dirname, '../public/') });
  } else {
    ctx.body = {
      status: 1,
      message: '文件不存在'
    };
  }
};
