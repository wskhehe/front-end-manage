const passport = require('../controllers/passport');

module.exports = router => {
  router.post('/passport/login', passport.login);
  return router;
};
