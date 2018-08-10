const config = {
  clintDomain: 'http://qiaodev.natapp4.cc',
  domainname: 'http://qiaodev.natapp4.cc',
  token: 'qiaodev',
  appid: 'wxe31dbcc96c97dd38',
  secret: 'd038c373619dd1bad899a0820eff3975',
  encodingAESKey: '',
  template_config: {
    tpl_orderProcess: 'tNysjmEiZ_fpoc0CuCQEqYuVO1Mg3NYTbZHMyuHni5E', //运单流程
    tpl_withDraw: 'QWISthqMXyqcIx9As-3bgAiVn-MlZna6tmwg89n07vc', //提现
    tpl_transfer: 's50DWfROZO6B-0WuTcAVNs1XF7lAGzZqJpZhFD7740A', //转账
    tpl_certificates: 'ETzrJoHbWpzoyhtSoNytm_UiWdBOpqv7FgtNOO88ooM', //证件需更新
    tpl_timeoutsign: '8OLqMOE7FPvtRU7Zt0--WXt-i-cA5qDSS7TkVVGbMc0', //48小时未签到
    tpl_newyear: 'fE6wjkFIE1xHwSEg_PD21FS3SXzoGrNXzHaBPgQ-AZs', //年度账单推送
    tpl_tyyRefound: '5kAWGMenDGSSipSyBriNPy3EwBKPvhNwruaW4DVOKO4', //途悠悠退款通知
    tpl_agentStock: '7elZi4DnIbEasxANWm7U3L7yyQrhsUa303DFY7A9bOk' //经纪人货源推送（未添加内网id，公用测试id）
  }
};

module.exports = config;
