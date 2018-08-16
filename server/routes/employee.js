const router = require('koa-router')();
const employee = require('../controllers/employee');

router.post('/qiaodev/employee/addEmployee', employee.addEmployee);
router.post('/qiaodev/employee/getEmployeeList', employee.getEmployeeList);
router.get('/qiaodev/employee/getEmployee', employee.getEmployee);
router.post('/qiaodev/employee/updateEmployee', employee.updateEmployee);
router.post('/qiaodev/employee/updateEmployeePassword', employee.updateEmployeePassword);
router.get('/qiaodev/employee/deleteEmployee', employee.deleteEmployee);

module.exports = router;
