const router = require('koa-router')();
const Mock = require('../controllers/mock');

router.get('/qiaodev/mock/getlist', Mock.getList);
router.post('/qiaodev/mock/postform', Mock.postForm);

module.exports = router;
