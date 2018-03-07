const db = require('../db');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

class User {
  constructor(name, email, password) {
    this.name = name,
    this.email = email,
    this.password = password
  }
}

const addUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const hash = bcrypt.hashSync(password, salt);
    const user = new User(name, email, hash);
    console.log(user);
    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const findByEmail = email => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email IN (?) LIMIT 1', email, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  })
}

const verifyUser = (email, password) => {
  return new Promise((resolve, reject) => {
    findByEmail(email)
      .then(result => {
        const storedPassword = result[0].password;
        const verified = bcrypt.compareSync(password, storedPassword);
        resolve({
          verified: verified,
          data: result[0]
        });
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  addUser: addUser,
  findByEmail: findByEmail,
  verifyUser: verifyUser
}