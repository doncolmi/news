const express = require('express');
const app = express();

const main = require('./main/index');
const news = require('./main/news');

app.use('/', main);
app.use('/news', news);

module.exports = app;