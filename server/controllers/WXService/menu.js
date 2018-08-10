const WXconfig = require('./WXconfig');
module.exports = {
  button: [
    {
      type: 'view',
      name: '预约打印',
      url: `${WXconfig.clintDomain}/reserve.html`
    },
    {
      type: 'view',
      name: '资料库',
      url: `${WXconfig.clintDomain}/library.html`
    },
    {
      name: '我的',
      sub_button: [
        {
          type: 'view',
          name: '个人中心',
          url: `${WXconfig.clintDomain}/mycenter.html`
        },
        {
          type: 'view',
          name: '关于我们',
          url: `${WXconfig.clintDomain}/about.html`
        },
        {
          type: 'click',
          name: '赞一下我们',
          key: 'ZAN'
        }
      ]
    }
  ]
};
