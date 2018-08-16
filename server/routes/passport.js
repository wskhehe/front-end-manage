const router = require('koa-router')();
const passport = require('../controllers/passport');

router.post('/qiaodev/passport/login', passport.login);

module.exports = router;
