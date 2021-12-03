const express = require('express');
const app = express();
const artTemplate = require('express-art-template');
const path = require('path');
const router = require('./router');

app.engine('html', artTemplate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Request-With');
  res.header('Access-Control-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(router);

app.listen(7777, () => {
  console.log('service is running, please access 127.0.0.1:7777');
});