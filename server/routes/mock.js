const Mock = require('../controllers/mock');

module.exports = router => {
  router.get('/mock/getlist', Mock.getList);
  router.post('/mock/postform', Mock.postForm);
  return router;
};
