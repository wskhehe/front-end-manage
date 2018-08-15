const router = require('koa-router')();
const setting = require('../controllers/setting');

router.post('/qiaodev/setting/validator', setting.validator);
router.post('/qiaodev/setting/addDict', setting.addDict);
router.get('/qiaodev/setting/getDict', setting.getDict);
router.get('/qiaodev/setting/delDict', setting.delDict);

module.exports = router;
