var SQL = {
  addDict:
    'INSERT INTO fem_dict(id,value,label,type,`desc`,`sort`,parent_id,remarks) VALUES(?,?,?,?,?,?,?,?)',
  getDictAll: 'select * from fem_dict',
  getDictByKey: 'select * from fem_dict where parent_id = ?',
  delDict: 'delete from fem_dict where id = ?',
  bangding: 'UPDATE user SET type = ?,openid = ? WHERE username = ? AND password = ? ',
  queryAll: 'SELECT * FROM user',
  getUserByOpenid: 'SELECT * FROM user WHERE openid = ? ',
  getUserByInfo: 'SELECT * FROM user WHERE username = ? AND password = ? ',
  deleteUserByInfo: 'DELETE FROM user WHERE username = ? AND password = ? ',
  queryFail: 'SELECT * FROM useruser',
  insertWXuser:
    'INSERT INTO wx_user(openid,name,phone,avatarUrl,city,country,gender,lagnuage,nickName,province) VALUES(?,?,?,?,?,?,?,?,?,?)',
  updateWXuser:
    'UPDATE wx_user SET avatarUrl = ?,city = ?,country =?,gender=?,lagnuage=?,nickName=?,province=? WHERE openid = ?',
  selectWXuser: 'SELECT * FROM wx_user WHERE phone = ?',
  selectWXuserOpenid: 'SELECT * FROM wx_user WHERE openid = ?'
};
module.exports = SQL;
