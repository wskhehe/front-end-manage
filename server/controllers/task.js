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
  console.log(ctx.request.body);
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
    remarks: [{ required: false, type: 'string', min: 1, max: 255, message: 'remarks module' }]
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
 * @api {get} /task/getDict 查询字典
 * @apiName getDict
 * @apiGroup task
 * @apiVersion  1.0.0
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
 * @api {post} /task/updateEmployee 更新角色信息
 * @apiName updateEmployee
 * @apiGroup task
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
 * @api {get} /task/delDict 删除字典
 * @apiName delDict
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
