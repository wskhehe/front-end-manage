const fileService = require('../controllers/fileService');

module.exports = router => {
  router.get('/download', fileService.download);
  router.post('/upload', fileService.upload);
  return router;
};
