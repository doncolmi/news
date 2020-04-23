const express = require('express');
const app = express();

const index = require('./index/index');
const news = require('./index/news');
const user = require('./index/user');

const main = require('./main/main');
const press = require('./main/press');
const topic = require('./main/topic');

app.use('/', index);
app.use('/news', news);
app.use('/user', user);
app.use('/main', main);
app.use('/press', press);
app.use('/topic', topic);

module.exports = app;