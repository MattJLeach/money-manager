const User = require('../models/user');
const Token = require('../models/token');

module.exports.login = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if(!user.length) {
      return res.status(401).json({
        message: 'Email or password incorrect'
      });
    }
    console.log(JSON.stringify(user));
    const isPasswordValid = await User.verifyUserPassword(req.body.password, user[0].password);
    console.log(isPasswordValid);
    if(!isPasswordValid) {
      return res.status(401).json({
        message: 'Email or password incorrect'
      });
    }
    const token = await Token.addToken(user[0].id, user[0].email);
    return res.status(200).json({
      message: 'Working on login',
      token: token
    });
  } catch(err) {
    res.status(500).json({
      message: 'Server error',
      error: err
    });
  }
  /* user.verifyUser(req.body.email, req.body.password)
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
    }); */
}

module.exports.register = async (req, res) => {
  try {
    const existingUser = await User.findByEmail(req.body.email);
    if(existingUser) {
      return res.status(401).json({
        message: 'User already exists'
      });
    }
    const newUser = await User.addUser(req.body.name, req.body.email, req.body.password);
    const userData = await User.findByID(newUser.insertId);
    return res.status(200).json({
      message: 'User registered',
      user: {
        name: userData.name,
        email: userData.email
      }
    });
  } catch(err) {
    res.status(500).json({
      message: 'Server error',
      error: err
    });
  }
}
