const router = require('koa-router')();
const fileService = require('../controllers/fileService');

router.get('/qiaodev/download/:filename', fileService.download);
router.post('/qiaodev/upload', fileService.upload);
router.get('/qiaodev/saveUploadFile', fileService.saveUploadFile);

module.exports = router;
