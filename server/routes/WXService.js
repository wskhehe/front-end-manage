const router = require('koa-router')();
const WXReply = require('../controllers/WXService/WXReply');
const WXAuthor = require('../controllers/WXService/WXAuthor');
// const WXClass = require('../controllers/WXService/WXClass');

// router.post('/qiaodev/WXAuthor/analysis', WXAuthor.analysis);
// router.post('/qiaodev/WXAuthor/getAuthentication', WXAuthor.getAuthentication);

// router.get('/qiaodev/WXClass/queryWXuser', WXClass.queryWXuser);
// router.post('/qiaodev/WXClass/queryWXuserOpenid', WXClass.queryWXuserOpenid);
// router.post('/qiaodev/WXClass/addWXuser', WXClass.addWXuser);
router.get('/qiaodev/WXClass/WXReply', WXReply);
router.post('/qiaodev/WXClass/WXReply', WXReply);
router.get('/qiaodev/WXAuthor/createMenu', WXAuthor.createMenu);
module.exports = router;
