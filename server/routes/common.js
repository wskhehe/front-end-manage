const common = require('../controllers/common');

module.exports = router => {
  router.post('/common/validator', common.validator);
  router.post('/common/upload', common.upload);
  router.get('/common/download', common.download);
  return router;
};
