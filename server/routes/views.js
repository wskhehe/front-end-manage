const router = require('koa-router')();
const Views = require('../controllers/views');

router.get('/hello/:name', Views.hello);
router.get('/', Views.indexs);
router.get('/index', Views.indexs);
router.get('/about', Views.about);
router.get('/upload', Views.upload);

module.exports = router;
