const conn = require('../db/DBConfig');
const Sql = require('../db/employeeSql');
const Validator = require('../utils/validator');
const uuidv1 = require('uuid/v1');
const uploader = require('../utils/uploader');
/**
 * @apiDefine employee 角色
 */

/**
 *
 * @api {post} /employee/addEmployee 添加角色
 * @apiName addEmployee
 * @apiGroup employee
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {String} name 姓名
 * @apiParam  {String} account 账号
 * @apiParam  {String} password 密码
 * @apiParam  {String} icon 头像
 * @apiParam  {String} group 所属小组
 *
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'添加成功'
 * }
 *
 */
exports.addEmployee = async (ctx, next) => {
  const rules = {
    name: [{ required: true, type: 'string', min: 1, max: 30, message: 'invalid name' }],
    account: [{ required: true, type: 'string', min: 1, max: 20, message: 'invalid account' }],
    password: [{ required: true, type: 'string', min: 1, max: 32, message: 'invalid password' }],
    icon: [
      { required: true, type: 'string', min: 1, max: 255, message: 'invalid icon' },
      {
        type: 'string',
        validator: (rule, value, callback) => {
          let ext = value.split('.');
          ext = ext[ext.length - 1].toLowerCase();
          console.log(ext);
          if (ext) {
            if (ext != 'jpg' && ext != 'jpeg' && ext != 'png') {
              return callback(new Error(rule.message));
            }
          }
          callback();
        },
        message: '头像只能是jpg、jpeg、png格式的图片'
      }
    ],
    group: [{ required: true, type: 'string', len: 32, message: 'invalid group' }]
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
  let fileRtn = await uploader.saveUploadFile(ctx.request.body.icon);
  if (fileRtn.status != 0) {
    ctx.response.body = {
      status: 1,
      message: '保存用户头像失败',
      data: fileRtn.data
    };
    return;
  }
  let params = [];
  params.push(uuidv1().replace(/-/g, ''));
  params.push(ctx.request.body.name);
  params.push(ctx.request.body.account);
  params.push(ctx.request.body.password);
  params.push(fileRtn.data);
  params.push(ctx.request.body.group);

  let result = await conn.query(Sql.addEmployee, params);
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
 * @api {POST} /employee/getEmployeeList 查询人员列表
 * @apiName getDict
 * @apiGroup employee
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 *
 * @apiSuccess {Number} status 0
 * @apiSuccess {Object} data
 * @apiSuccess {Number} data.count 条数
 * @apiSuccess {Object} data.list
 * @apiSuccess {String} data.list.id 编号
 * @apiSuccess {String} data.list.name 姓名
 * @apiSuccess {String} data.list.account 帐号
 * @apiSuccess {String} data.list.password 密码
 * @apiSuccess {String} data.list.icon 头像
 * @apiSuccess {String} data.list.group 所属分组
 *
 */
exports.getEmployeeList = async (ctx, next) => {
  let result = await conn.query(Sql.getEmployeeList);
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
 * @api {get} /employee/getEmployee 查询人员
 * @apiName delDict
 * @apiGroup employee
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {String} id 编号
 *
 *
 * @apiSuccess {Number} status 0
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.id 编号
 * @apiSuccess {String} data.name 姓名
 * @apiSuccess {String} data.account 帐号
 * @apiSuccess {String} data.password 密码
 * @apiSuccess {String} data.icon 头像
 * @apiSuccess {String} data.group 所属分组
 *
 *
 */
exports.getEmployee = async (ctx, next) => {
  let rules = {
    id: [{ required: true, type: 'string', len: 32, message: 'invalid id' }]
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

  let result = await conn.query(Sql.getEmployeeById, [ctx.query.id]);
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
 * @api {post} /employee/updateEmployee 更新角色信息
 * @apiName updateEmployee
 * @apiGroup employee
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 *
 * @apiParam  {String} id 编号
 * @apiParam  {String} name 姓名
 * @apiParam  {String} account 账号
 * @apiParam  {String} icon 头像
 * @apiParam  {String} group 所属小组
 *
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'修改成功'
 * }
 *
 */
exports.updateEmployee = async (ctx, next) => {
  const rules = {
    id: [{ required: true, type: 'string', len: 32, message: 'invalid id' }],
    name: [{ required: true, type: 'string', min: 1, max: 30, message: 'invalid name' }],
    account: [{ required: true, type: 'string', min: 1, max: 20, message: 'invalid account' }],
    icon: [
      { required: true, type: 'string', min: 1, max: 255, message: 'invalid icon' },
      {
        type: 'string',
        validator: (rule, value, callback) => {
          let ext = value.split('.');
          ext = ext[ext.length - 1].toLowerCase();
          console.log(ext);
          if (ext) {
            if (ext != 'jpg' && ext != 'jpeg' && ext != 'png') {
              return callback(new Error(rule.message));
            }
          }
          callback();
        },
        message: '头像只能是jpg、jpeg、png格式的图片'
      }
    ],
    group: [{ required: true, type: 'string', len: 32, message: 'invalid group' }]
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
  let fileRtn = await uploader.saveUploadFile(ctx.request.body.icon);
  if (fileRtn.status != 0) {
    ctx.response.body = {
      status: 1,
      message: '保存用户头像失败',
      data: fileRtn.data
    };
    return;
  }
  let params = [];
  params.push(ctx.request.body.name);
  params.push(ctx.request.body.account);
  params.push(ctx.request.body.icon);
  params.push(ctx.request.body.group);
  params.push(ctx.request.body.id);

  let result = await conn.query(Sql.updateEmployee, params);
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
        message: '修改成功'
      };
    }
  }
};
/**
 *
 * @api {get} /employee/deleteEmployee 删除角色
 * @apiName deleteEmployee
 * @apiGroup employee
 * @apiVersion  1.0.0
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
exports.deleteEmployee = async (ctx, next) => {
  let rules = {
    id: [{ required: true, type: 'string', len: 32, message: 'invalid id' }]
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
  const result = await conn.query(Sql.delEmployee, [ctx.query.id]);
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
/**
 *
 * @api {post} /employee/updateEmployeePassword 修改角色密码
 * @apiName updateEmployeePassword
 * @apiGroup employee
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {String} id 编号
 * @apiParam  {String} password 旧密码
 * @apiParam  {String} newpassword 新密码
 *
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'修改成功'
 * }
 *
 */
exports.updateEmployeePassword = async (ctx, next) => {
  let rules = {
    id: [{ required: true, type: 'string', len: 32, message: 'invalid id' }],
    password: [{ required: true, type: 'string', min: 1, max: 32, message: 'invalid password' }],
    newpassword: [
      { required: true, type: 'string', min: 1, max: 32, message: 'invalid newpassword' }
    ]
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
  params.push(ctx.request.body.newpassword);
  params.push(ctx.request.body.id);
  params.push(ctx.request.body.password);
  const result = await conn.query(Sql.updateEmployeePassword, params);
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
        message: '修改成功'
      };
    }
  }
};
