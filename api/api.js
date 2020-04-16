const express = require('express');
const app = express();

const index = require('./index/index');
const news = require('./index/news');
const user = require('./index/user');

const main = require('./main/main');

app.use('/', index);
app.use('/news', news);
app.use('/user', user);
app.use('/main', main);

module.exports = app;