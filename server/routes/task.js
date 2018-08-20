const task = require('../controllers/task');

module.exports = router => {
  router.post('/task/addTask', task.addTask);
  router.post('/task/getTaskList', task.getTaskList);
  router.post('/task/updateTask', task.updateTask);
  router.post('/task/updateTaskState', task.updateTaskState);
  router.get('/task/delTask', task.delTask);
  return router;
};
