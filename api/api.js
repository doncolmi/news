const express = require('express');
const app = express();

const main = require('./main/index');

app.use('/', main);

module.exports = app;