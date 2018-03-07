const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

const authRoutes = require('./routes/auth');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API running'
  });
});

app.use('/auth', authRoutes);

module.exports = app;