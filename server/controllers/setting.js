/**
 * @apiDefine group 设置
 */

/**
 *
 * @api {get} /setting/addDict 添加字典
 * @apiName addDict
 * @apiGroup group
 * @apiVersion  1.1.1
 *
 *
 * @apiParam  {String} value 键值
 * @apiParam  {String} label 键名
 * @apiParam  {String} test=1 这是一段描述
 * @apiParam  {String} [asda] 可选
 *
 * @apiSuccess {Number} status 0
 * @apiSuccess {String} message 添加成功
 *
 * @apiSuccessExample {Object} 成功示例:
 * {
 *     status : 0,
 *     message:'添加成功'
 * }
 *
 *
 */
exports.postForm = async (ctx, next) => {
  ctx.response.body = {
    status: 0,
    message: '成功',
    query: ctx.query,
    data: data
  };
};
