var mysql = require('mysql');
var connection = mysql.createPool({
  host: '192.168.11.82',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'fem'
});

// connection.connect();
var DB = {
  query: function(sql, param) {
    return new Promise((resolve, reject) => {
      connection.query(sql, param, function(err, rows) {
        if (err) {
          resolve({ error: err }); //sql查询出错
        } else {
          resolve(rows);
        }
      });
    });
  }
};
module.exports = DB;
