const conn = require('../db/DBConfig');
const Sql = require('../db/taskSql');
const Validator = require('../utils/validator');
const uuidv1 = require('uuid/v1');

/**
 * @apiDefine task 任务
 */

/**
 *
 * @api {post} /task/addTask 添加任务
 * @apiName addTask
 * @apiGroup task
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 * @apiParam  {String} project 项目 关联项目字典
 * @apiParam  {String} module 模块 100字以内
 * @apiParam  {String} developer 开发者 关联用户字典
 * @apiParam  {String} level 优先级 关联级别字典
 * @apiParam  {String} task_desc 任务描述 255字以内
 * @apiParam  {String} plan_start_time 计划开始时间 时间戳
 * @apiParam  {String} plan_end_time 计划完成时间 时间戳
 * @apiParam  {String} [remarks] 备注 255字以内
 *
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'添加成功'
 * }
 *
 */
exports.addTask = async (ctx, next) => {
  let rules = {
    project: [{ required: true, type: 'string', len: 32, message: 'invalid project' }],
    module: [{ required: true, type: 'string', min: 1, max: 100, message: 'invalid module' }],
    developer: [{ required: true, type: 'string', len: 32, message: 'invalid developer' }],
    level: [{ required: true, type: 'string', len: 32, message: 'invalid level' }],
    task_desc: [{ required: true, type: 'string', min: 1, max: 255, message: 'invalid task_desc' }],
    plan_start_time: [
      { required: true, message: 'invalid plan_start_time' },
      {
        type: 'string',
        validator: (rule, value, callback) => {
          if (value == '') return callback(new Error());
          if (new Date(value) == 'Invalid Date') {
            return callback(new Error());
          } else if (new Date(value) > new Date(ctx.request.body[rule.otherFiled])) {
            rule.message = '计划开始时间不可大于计划结束时间';
            return callback(new Error());
          } else {
            callback();
          }
        },
        otherFiled: 'plan_end_time',
        message: 'invalid plan_start_time'
      }
    ],
    plan_end_time: [
      { required: true, message: 'invalid plan_end_time' },
      {
        type: 'string',
        validator: (rule, value, callback) => {
          if (new Date(value) == 'Invalid Date') {
            return callback(new Error());
          } else if (new Date(value) < new Date(ctx.request.body[rule.otherFiled])) {
            rule.message = '计划开始时间不可大于计划结束时间';
            return callback(new Error());
          } else {
            callback();
          }
        },
        otherFiled: 'plan_start_time',
        message: 'invalid plan_end_time'
      }
    ],
    remarks: [{ required: false, type: 'string', min: 1, max: 255, message: 'invalid remarks' }]
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
  params.push(ctx.request.body.project);
  params.push(ctx.request.body.module);
  params.push(ctx.request.body.developer);
  params.push(ctx.request.body.level);
  params.push(ctx.request.body.task_desc);
  params.push(ctx.request.body.plan_start_time);
  params.push(ctx.request.body.plan_end_time);
  params.push(ctx.request.body.remarks);
  params.push(1);

  let result = await conn.query(Sql.addTask, params);
  if (result.error) {
    ctx.response.body = {
      status: 1,
      message: '数据库操作错误',
      sqlError: result.error
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
 * @api {post} /task/getTaskList 查询任务列表
 * @apiName getTaskList
 * @apiGroup task
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 *
 *
 * @apiSuccess  {String} id 编号
 * @apiSuccess  {String} project 项目
 * @apiSuccess  {String} module 模块
 * @apiSuccess  {String} developer 开发者
 * @apiSuccess  {String} level 优先级
 * @apiSuccess  {String} task_desc 任务描述
 * @apiSuccess  {String} create_time 计划创建时间
 * @apiSuccess  {String} plan_start_time 计划开始时间
 * @apiSuccess  {String} plan_end_time 计划完成时间
 * @apiSuccess  {String} real_end_time 实际完成时间
 * @apiSuccess  {String} remarks 备注
 * @apiSuccess  {String} state 状态
 *
 *
 *
 */
exports.getTaskList = async (ctx, next) => {
  let result = await conn.query(Sql.getTaskList);
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
 * @api {post} /task/updateTask 修改任务
 * @apiName updateTask
 * @apiGroup task
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 *
 * @apiParam  {String} id 编号
 * @apiParam  {String} project 项目 关联项目字典
 * @apiParam  {String} module 模块 100字以内
 * @apiParam  {String} developer 开发者 关联用户字典
 * @apiParam  {String} level 优先级 关联级别字典
 * @apiParam  {String} task_desc 任务描述 255字以内
 * @apiParam  {String} plan_start_time 计划开始时间 时间戳
 * @apiParam  {String} plan_end_time 计划完成时间 时间戳
 * @apiParam  {String} remarks 备注 255字以内
 *
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'添加成功'
 * }
 *
 *
 *
 */
exports.updateTask = async (ctx, next) => {
  let rules = {
    id: [{ required: true, type: 'string', len: 32, message: 'invalid id' }],
    project: [{ required: true, type: 'string', len: 32, message: 'invalid project' }],
    module: [{ required: true, type: 'string', min: 1, max: 100, message: 'invalid module' }],
    developer: [{ required: true, type: 'string', len: 32, message: 'invalid developer' }],
    level: [{ required: true, type: 'string', len: 32, message: 'invalid level' }],
    task_desc: [{ required: true, type: 'string', min: 1, max: 255, message: 'invalid task_desc' }],
    plan_start_time: [
      { required: true, message: 'invalid plan_start_time' },
      {
        type: 'string',
        validator: (rule, value, callback) => {
          if (value == '') return callback(new Error());
          if (new Date(value) == 'Invalid Date') {
            return callback(new Error());
          } else if (new Date(value) > new Date(ctx.request.body[rule.otherFiled])) {
            rule.message = '计划开始时间不可大于计划结束时间';
            return callback(new Error());
          } else {
            callback();
          }
        },
        otherFiled: 'plan_end_time',
        message: 'invalid plan_start_time'
      }
    ],
    plan_end_time: [
      { required: true, message: 'invalid plan_end_time' },
      {
        type: 'string',
        validator: (rule, value, callback) => {
          if (new Date(value) == 'Invalid Date') {
            return callback(new Error());
          } else if (new Date(value) < new Date(ctx.request.body[rule.otherFiled])) {
            rule.message = '计划开始时间不可大于计划结束时间';
            return callback(new Error());
          } else {
            callback();
          }
        },
        otherFiled: 'plan_start_time',
        message: 'invalid plan_end_time'
      }
    ],
    remarks: [{ required: false, type: 'string', min: 1, max: 255, message: 'invalid remarks' }]
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
  params.push(ctx.request.body.project);
  params.push(ctx.request.body.module);
  params.push(ctx.request.body.developer);
  params.push(ctx.request.body.level);
  params.push(ctx.request.body.task_desc);
  params.push(ctx.request.body.plan_start_time);
  params.push(ctx.request.body.plan_end_time);
  params.push(ctx.request.body.remarks);
  params.push(ctx.request.body.id);

  let result = await conn.query(Sql.updateTask, params);
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
 * @api {post} /task/updateTaskState 修改任务状态
 * @apiName updateTaskState
 * @apiGroup task
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization token
 *
 *
 * @apiParam  {String} id 编号
 * @apiParam  {String} state 状态
 *
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'修改成功'
 * }
 *
 *
 *
 */
exports.updateTaskState = async (ctx, next) => {
  let rules = {
    id: [{ required: true, type: 'string', len: 32, message: 'invalid id' }],
    state: [{ required: false, type: 'string', len: 1, message: 'invalid state' }]
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
  params.push(ctx.request.body.state);
  params.push(ctx.request.body.id);

  let result = await conn.query(Sql.updateTaskState, params);
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
 * @api {get} /task/delTask 删除任务
 * @apiName delTask
 * @apiGroup task
 * @apiVersion  1.0.0
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
exports.delTask = async (ctx, next) => {
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
  const result = await conn.query(Sql.delTask, [ctx.query.id]);
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
