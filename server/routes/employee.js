const employee = require('../controllers/employee');

module.exports = router => {
  router.post('/employee/addEmployee', employee.addEmployee);
  router.post('/employee/getEmployeeList', employee.getEmployeeList);
  router.get('/employee/getEmployee', employee.getEmployee);
  router.post('/employee/updateEmployee', employee.updateEmployee);
  router.post('/employee/updateEmployeePassword', employee.updateEmployeePassword);
  router.get('/employee/deleteEmployee', employee.deleteEmployee);
  return router;
};
