var schema = require('async-validator');
const Validator = require('validator');

exports.validator = async (source, rules) => {
  return new Promise((resolve, reject) => {
    var vali = new schema(rules);
    vali.validate(source, (errors, fields) => {
      if (errors) {
        resolve(errors);
      } else {
        resolve();
      }
    });
  });
};
// 是否是时间戳
exports.isTimestamp = val => {
  return /^\d+$/.test(val);
};
//验证数字和小数
exports.isNumber = (val, isZero = true, num = 2) => {
  // 0.0  0.00通过 正常数字通过 0不通过
  var reg = new RegExp(
    '^(([1-9][0-9]*)|(([0]\\.\\d{1,' + num + '}|[1-9][0-9]*\\.\\d{1,' + num + '})))$'
  );
  var tag = reg.test(val);
  if (tag) {
    if (isZero) {
      if (val === '0' || val === 0) {
        return true;
      }
      // 0.0 0.00 0.000这种情况不能通过
      if (
        parseInt(val.toString().split('.')[0]) === 0 &&
        parseInt(val.toString().split('.')[1]) === 0
      ) {
        return false;
      }
    } else {
      if (
        parseInt(val.toString().split('.')[0]) === 0 &&
        parseInt(val.toString().split('.')[1]) === 0
      ) {
        return false;
      }
    }
    return tag;
  } else {
    if (isZero) {
      if (val === '0' || val === 0) {
        return true;
      }
    } else {
      return tag;
    }
    return tag;
  }
};
exports.validator2 = async (source, rules) => {
  let rule = {
    age: [
      { required: true, message: '请输入年龄1' },
      { type: 'number', message: '请输入年龄2' },
      { min: 10, message: '请输入年龄3' },
      { max: 30, message: '请输入年龄4' },
      { matches: true, message: '请输入年龄5' }
    ]
  };
};
