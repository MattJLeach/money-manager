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
    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const findByID = id => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id IN (?) LIMIT 1', id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user[0]);
      }
    });
  })
}

const findByEmail = email => {
  return new Promise((resolve, reject) => {
    console.log(email);
    db.query('SELECT * FROM users WHERE email IN (?) LIMIT 1', email, (err, user) => {
      if (err) {
        console.log('Error', err);
        reject(err);
      } else {
        console.log('User', user);
        resolve(user);
      }
    });
  })
}

const verifyUserPassword = (enteredPassword, storedPassword) => {
  console.log(enteredPassword, storedPassword);
  return bcrypt.compareSync(enteredPassword, storedPassword);
  /* return new Promise((resolve, reject) => {
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
  }); */
}

module.exports = {
  addUser: addUser,
  findByID: findByID,
  findByEmail: findByEmail,
  verifyUserPassword: verifyUserPassword
}