const express = require('express');
const app = express();

const main = require('./main/index');
const news = require('./main/news');
const user = require('./main/user');

app.use('/', main);
app.use('/news', news);
app.use('/user', user);

module.exports = app;