var SQL = {
  addEmployee:
    'INSERT INTO fem_employee(id,name,account,password,icon,`group`) VALUES(?,?,?,?,?,?)',
  getEmployeeList: 'select * from fem_employee',
  getEmployeeById: 'select * from fem_employee where id = ?',
  updateEmployee: 'UPDATE fem_employee SET name = ?,account = ?,icon=?,`group`=? WHERE id = ?',
  updateEmployeePassword: 'UPDATE fem_employee SET password = ? WHERE id = ? and password = ?',
  delEmployee: 'delete from fem_employee where id = ?'
};
module.exports = SQL;
