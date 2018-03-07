const db = require('../db');
const jwt = require('jsonwebtoken');

class Token {
  constructor(user_id, token, expired) {
    this.user_id = user_id,
    this.token = token,
    this.expired = expired
  }
}

const addToken = (user_id, email) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({user_id: user_id, email: email}, 'secret');
    const tokenData = new Token(user_id, token, false);
    db.query('INSERT INTO tokens SET ?', tokenData, (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

const getValidTokens = (user_id) => {

}

module.exports = {
  addToken: addToken
}