var mysql = require('mysql');
var pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'sidea',
  connectionLimit:10
});
console.log("连接池创建完成,该连接池只会创建一次");
module.exports=pool;