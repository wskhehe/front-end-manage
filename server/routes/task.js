const router = require('koa-router')();
const task = require('../controllers/task');

router.post('/qiaodev/task/addTask', task.addTask);
router.get('/qiaodev/task/getDict', task.getDict);
router.get('/qiaodev/task/delDict', task.delDict);

module.exports = router;
