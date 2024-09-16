const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const port = process.env.PORT || 4000; 


const app = express();


app.use(compression());

global.db = require('./app/models/index');

const routes = require('./app/routes');
const helper = require('./app/helpers');

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://cv-resume-builder-backend.vercel.app/0');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token,authorization');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
  } else {
    next();
  }
  global.baseUrl = `${helper.http.getProtocol(req)}://${helper.http.getHost(req)}:${app.get('port')}`;
});
app.use(routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
