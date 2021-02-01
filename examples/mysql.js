/* 
  npm install mysql


 */

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'pv0Et7jsjrnPQ',
  database: 'data__rdavis2'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
