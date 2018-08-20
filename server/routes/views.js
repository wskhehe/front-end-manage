const koaRouter = require('koa-router');
const config = require('../config/config');
const Views = require('../controllers/views');

const router = new koaRouter({ prefix: config.clientBaseUrl });

router.get('/hello/:name', Views.hello);
router.get('/', Views.indexs);
router.get('/index', Views.indexs);
router.get('/about', Views.about);
router.get('/upload', Views.upload);
module.exports = router;
