var SQL = {
  addTask:
    'INSERT INTO fem_task(id,project,module,developer,level,task_desc,create_time,plan_start_time,plan_end_time,remarks,state) VALUES(?,?,?,?,?,?,now(),?,?,?,?)',
  getTaskList: 'select * from fem_task',
  updateTask:
    'UPDATE fem_task SET project = ?,module = ?,developer=?,level=?,task_desc=?,plan_start_time=?,plan_end_time=?,remarks=? WHERE id = ?',
  updateTaskState: 'UPDATE fem_task SET state = ? WHERE id = ?',
  delTask: 'delete from fem_task where id = ?'
};
module.exports = SQL;
