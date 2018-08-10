const router = require('koa-router')();
const devService = require('../controllers/devService');

router.post('/qiaodev/dev/add', devService.add);
router.get('/qiaodev/dev/query', devService.query);

module.exports = router;
