const express = require('express');
const router = express.Router();
const auth = require('../../services/util/auth');

router.get('/', auth.login, function (req, res) {
    res.render('user/main', {name : req.session.key.id});
});

router.get('/news', auth.login, function (req, res) {
    res.render('user/news', {name : req.session.key.id});
});

router.get('/press', auth.login, function (req, res) {
    res.render('user/press', {name : req.session.key.id});
});

module.exports = router;