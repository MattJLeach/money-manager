const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'vagrant',
  password: 'test123',
  database: 'money'
});

migration.init(connection, __dirname + '/migrations');