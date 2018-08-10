const router = require('koa-router')();
const fileService = require('../controllers/fileService');

router.get('/qiaodev/download/:filename', fileService.download);
router.post('/qiaodev/upload', fileService.upload);

module.exports = router;
