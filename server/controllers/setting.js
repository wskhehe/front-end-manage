const conn = require('../db/DBConfig');
const Sql = require('../db/settingSql');
const Validator = require('../utils/validator');
const uuidv1 = require('uuid/v1');

/**
 * @apiDefine setting 设置
 */

/**
 *
 * @api {post} /setting/validator 参数校验示例
 * @apiName validator
 * @apiGroup setting
 * @apiVersion  1.1.4
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
 * @api {post} /setting/addDict 添加字典
 * @apiName addDict
 * @apiGroup setting
 * @apiVersion  1.1.1
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {String} value 数据值
 * @apiParam  {String} label 标签名
 * @apiParam  {String} type 字典类型
 * @apiParam  {String} desc 描述文本
 * @apiParam  {String} parent_id 父级编号(顶级则留空)
 * @apiParam  {String} [remarks] 备注
 *
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'添加成功'
 * }
 *
 */
exports.addDict = async (ctx, next) => {
  const rules = {
    value: [
      { required: true, message: 'value 不能为空' },
      { type: 'string', min: 1, max: 100, message: 'value 必须是100位以内字符串' }
    ],
    label: [
      { required: true, message: 'label 不能为空' },
      { type: 'string', min: 1, max: 100, message: 'label 必须是100位以内字符串' }
    ],
    type: [
      { required: true, message: 'type 不能为空' },
      { type: 'string', min: 1, max: 2, message: 'label 必须是2位以内字符串' }
    ],
    desc: [
      { required: true, message: 'desc 不能为空' },
      { type: 'string', min: 1, max: 255, message: 'desc 必须是255位以内字符串' }
    ],
    parent_id: [
      { required: true, message: 'parent_id 不能为空' },
      { type: 'string', len: 32, message: 'parent_id必须是32位字符串' }
    ],
    remarks: [{ type: 'string', min: 1, max: 255, message: 'remarks 必须是255位以内字符串' }]
  };
  const valiResult = await Validator.validator(ctx.request.body, rules);
  if (valiResult) {
    ctx.response.body = {
      status: 1,
      message: '参数错误',
      data: valiResult
    };
    return;
  }
  let params = [];
  params.push(uuidv1().replace(/-/g, ''));
  params.push(ctx.request.body.value);
  params.push(ctx.request.body.label);
  params.push(ctx.request.body.type);
  params.push(ctx.request.body.desc);
  params.push(10);
  params.push(ctx.request.body.parent_id || '');
  params.push(ctx.request.body.remarks);

  let result = await conn.query(Sql.addDict, params);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      code: result.error.errno,
      message: result.error.sqlMessage
    };
  } else {
    ctx.response.body = {
      status: 0,
      message: '添加成功'
    };
  }
};
/**
 *
 * @api {get} /setting/getDict 查询字典
 * @apiName getDict
 * @apiGroup setting
 * @apiVersion  1.1.2
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {String} parent_id 父级编号 为空表示查询全部
 *
 *
 * @apiSuccess {Number} status 0
 * @apiSuccess {Object} data
 * @apiSuccess {Number} data.count 条数
 * @apiSuccess {Object} data.list
 * @apiSuccess {String} data.list.id 编号
 * @apiSuccess {String} data.list.value 数据值
 * @apiSuccess {String} data.list.label 标签名
 * @apiSuccess {String} data.list.type 类型
 * @apiSuccess {String} data.list.desc 描述
 * @apiSuccess {Number} data.list.sort 排序
 * @apiSuccess {String} data.list.parent_id 父级编号
 * @apiSuccess {String} data.list.remarks 备注
 *
 *
 * @apiSuccessExample {Object} 成功示例:
    {
        "status": 0,
        "data": {
            "count": 1,
            "list": [
                {
                    "id": "3d7076f0a03d11e8ad1fdd6ae3180313",
                    "value": "task_grade",
                    "label": "任务级别字典",
                    "type": "1",
                    "desc": "任务级别字典",
                    "sort": 10,
                    "parent_id": "",
                    "remarks": "任务级别字典"
                }
            ]
        }
    }
 *
 */
exports.getDict = async (ctx, next) => {
  const parent_id = ctx.query.parent_id || '';
  let sql = Sql.getDictAll;
  if (parent_id) sql = Sql.getDictById;
  let result = await conn.query(sql, [parent_id]);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      code: result.error.errno,
      message: result.error.sqlMessage
    };
  } else {
    ctx.response.body = {
      status: 0,
      data: {
        count: result.length,
        list: result
      }
    };
  }
};
/**
 *
 * @api {get} /setting/delDict 删除字典
 * @apiName delDict
 * @apiGroup setting
 * @apiVersion  1.1.1
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {String} id 编号
 *
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'删除成功'
 * }
 *
 *
 */
exports.delDict = async (ctx, next) => {
  let rules = {
    id: [
      { required: true, message: 'id 不能为空' },
      { type: 'string', len: 32, message: 'id必须是32位字符串' }
    ]
  };
  const valiResult = await Validator.validator({ ...ctx.query }, rules);
  if (valiResult) {
    ctx.response.body = {
      status: 1,
      message: '参数错误',
      data: valiResult
    };
    return;
  }
  const result = await conn.query(Sql.delDict, [ctx.query.id]);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      code: result.error.errno,
      message: result.error.sqlMessage
    };
  } else {
    if (result.affectedRows == 0) {
      ctx.response.body = {
        status: 0,
        message: '没有该条数据'
      };
    } else {
      ctx.response.body = {
        status: 0,
        message: '删除成功'
      };
    }
  }
};
