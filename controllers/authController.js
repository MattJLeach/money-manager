const user = require('../models/user');
const token = require('../models/token');

module.exports.login = (req, res) => {
  user.verifyUser(req.body.email, req.body.password)
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
      if(!result.verified) {
        return res.status(403).json({
          message: 'Unauthenticated'
        });
      }
      return token.addToken(result.data.id, result.data.email);
    })
    .then(result => {
      if(!result.statusCode) {
        res.status(200).json({
          message: 'User logged in',
          token: result
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'An internal server error occured'
      });
    });
}

module.exports.register = (req, res) => {
  const email = req.body.email;
  user.findByEmail(email)
    .then(result => {
      if(result.length) {
        return res.status(401).json({
          message: 'User already exists'
        });
      } else {
        return user.addUser(req.body.name, req.body.email, req.body.password);
      }
    })
    .then(result => {
      if(!result.statusCode) {
        res.status(201).json({
          message: 'User registered',
          data: result
        });
      }
    })
    .catch(error => [
      res.status(500).json({
        message: 'An internal server error occured'
      })
    ]);
}
