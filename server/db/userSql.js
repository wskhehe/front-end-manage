var UserSQL = {
  insert: 'INSERT INTO user(name,sex) VALUES(?,?)',
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
module.exports = UserSQL;
