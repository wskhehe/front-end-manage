const Mock = require('mockjs');
const fs = require('fs');

exports.getList = async (ctx, next) => {
  // GET参数
  var Random = Mock.Random;
  // 扩展 mock占位符  补零
  Random.extend({
    zero: function(num, n) {
      var len = num.toString().length;
      while (len < n) {
        num = '0' + num;
        len++;
      }
      return num;
    }
  });

  const data = Mock.mock({
    count: 25,
    'list|25': [
      {
        // guid
        guid() {
          return Random.guid();
        },
        // 索引 从1开始 累加
        'idx|+1': 1,
        // 运单号 zero是扩展的占位符  补零
        ordernumber() {
          return `2017${Random.date('MMdd')}10065${Random.zero(this.idx, 5)}`;
        },
        // 文本类型
        text: function() {
          return Random.word(3, 5) + Random.cword(2, 4);
        },
        // 时间类型
        datetime() {
          return `2017-${Mock.Random.date('MM-dd')} ${Mock.Random.time()}`;
        },
        // 角色 从数组中随机
        'role|1': ['管理员', '财务', '现场', '技工'],
        // 随机名字 占位符
        name: '@name',
        // 随机电话 正则
        phone: /^1[34578]\d{9}$/,
        // 数字类型  随机11-99
        'age|11-99': 1,
        // 小数类型 整数部分1-100  小数部分保留1-3位小数  起始值10.2
        'price|1-100.1-3': 10.2,
        // 地址 占位符
        address: '@county(true)',
        // bool值类型 占位符
        isMale: '@boolean',
        // 邮件地址 占位符
        email: '@email',
        // 头像  随机生成图片 随机颜色
        avatar() {
          return Mock.Random.image(
            '100x100',
            Mock.Random.color(),
            '#757575',
            'png',
            this.name.substr(0, 1)
          );
        }
      }
    ]
  });
  ctx.response.body = {
    status: 0,
    message: '成功',
    query: ctx.query,
    data: data
  };
};
exports.postForm = async (ctx, next) => {
  // POST参数
  console.log(ctx.request.body);
  ctx.response.body = {
    status: 0,
    message: '成功',
    query: ctx.params,
    post: ctx.request.body,
    data: {
      name: 'qiao',
      age: 21
    }
  };
};
