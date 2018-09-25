const setting = require('../controllers/setting');

module.exports = router => {
  router.post('/setting/addDict', setting.addDict);
  router.post('/setting/getDict', setting.getDict);
  router.get('/setting/delDict', setting.delDict);
  return router;
};
