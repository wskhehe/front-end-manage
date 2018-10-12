// 全局验证rules
var vali = {
  // 手机号码验证
  phone: function(val) {
    return /^1[0-9]{10}$/.test(val);
  },
  // 大于或等于0 的整数
  isInt: function(val, isZero = true) {
    if (Math.floor(val) === val) {
      if (!isZero && Math.floor(val) === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  },
  // 验证数字和小数 不在input上使用.number修饰符
  isNumber: function(val, isZero = true, num = 2) {
    // 0.0  0.00通过 正常数字通过 0不通过
    var reg = new RegExp(
      '^(([1-9][0-9]*)|(([0]\\.\\d{1,' +
        num +
        '}|[1-9][0-9]*\\.\\d{1,' +
        num +
        '})))$'
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
  },
  // 6位数 数字验证（支付密码）
  checkPaypwd: function(val) {
    return /^[0-9]{6}$/.test(val);
  },
  // 4、6位数 数字验证（验证码）
  checkYzm: function(val) {
    return /^[0-9]{4}$|^[0-9]{6}$/.test(val);
  },
  // 数字、字母、数字+字母 组合
  checkstr: function(val, s = 1, e = 60) {
    // s 最小长度
    // e 最大长度
    var reg = new RegExp('^[a-zA-Z0-9]{' + s + ',' + e + '}$');
    return reg.test(val);
  },
  // 数字、字母、下划线组合
  checkpwd: function(val, s = 1, e = 60) {
    // s 最小长度
    // e 最大长度
    var reg = new RegExp('^w{' + s + ',' + e + '}$');
    return reg.test(val);
  },
  // 验证中文
  checkchina: function(val, s = 1, e = 60) {
    // s 最小长度
    // e 最大长度
    var reg = new RegExp('^[\u4E00-\u9FA5]{' + s + ',' + e + '}$');
    return reg.test(val);
  },
  // 银行卡号验证(6开头 16-19位)
  bankcard: function(val) {
    return /^6\d{15,18}$/.test(val);
  },
  // 车牌号验证
  plate: function(val) {
    var reg = /^[澳_川_鄂_甘_赣_贵_桂_港_黑_沪_京_津_冀_吉_晋_辽_鲁_蒙_闽_宁_青_琼_陕_苏_皖_湘_新_渝_豫_粤_云_藏_浙]{1}[A-Z]{1}[A-Z_0-9]{4}[A-Z_0-9_挂]{1}$/;
    return reg.test(val);
  },
  // 身份证验证
  idcard: function(val) {
    // 去掉所有的空格
    var cardNo = val.replace(/\s/g, '');

    var info = {
      isTrue: false,
      year: null,
      month: null,
      day: null,
      isMale: false,
      isFemale: false
    };
    if (!cardNo && cardNo.length != 18) {
      info.isTrue = false;
      return info;
    }

    if (cardNo.length == 18) {
      var year = cardNo.substring(6, 10);
      var month = cardNo.substring(10, 12);
      var day = cardNo.substring(12, 14);
      var p = cardNo.substring(14, 17);
      var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
      // 这里用getFullYear()获取年份，避免千年虫问题
      if (
        birthday.getFullYear() != parseFloat(year) ||
        birthday.getMonth() != parseFloat(month) - 1 ||
        birthday.getDate() != parseFloat(day)
      ) {
        info.isTrue = false;
        return info;
      }
      var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
      var Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
      // 验证校验位
      var sum = 0; // 声明加权求和变量
      var _cardNo = cardNo.split('');

      if (_cardNo[17].toLowerCase() == 'x') {
        _cardNo[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
      }
      for (var i = 0; i < 17; i++) {
        sum += Wi[i] * _cardNo[i]; // 加权求和
      }
      var s = sum % 11; // 得到验证码所位置

      if (_cardNo[17] != Y[s]) {
        info.isTrue = false;
        return info;
      }
      info.isTrue = true;
      info.year = birthday.getFullYear();
      info.month = birthday.getMonth() + 1;
      info.day = birthday.getDate();
      if (p % 2 == 0) {
        info.isFemale = true;
        info.isMale = false;
      } else {
        info.isFemale = false;
        info.isMale = true;
      }
      return info;
    }
    // 判断info.isTrue即可
    return info;
  },
  imgLimit: 3 // 图片上传大小限制为3M
};
export default vali;
