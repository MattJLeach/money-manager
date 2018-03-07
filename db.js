const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'vagrant',
  password: 'test123',
  database: 'money'
});

db.connect(err => {
  if (err) throw err;
});

module.exports = db;