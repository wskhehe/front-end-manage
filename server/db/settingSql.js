var SQL = {
  addDict:
    'INSERT INTO fem_dict(id,value,label,type,`desc`,`sort`,parent_id,remarks) VALUES(?,?,?,?,?,?,?,?)',
  getDictAll: 'select * from fem_dict',
  getDictById: 'select * from fem_dict where parent_id = ?',
  delDict: 'delete from fem_dict where id = ?'
};
module.exports = SQL;
