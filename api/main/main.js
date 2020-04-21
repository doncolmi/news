const express = require('express');
const router = express.Router();
const auth = require('../../services/util/auth');
const pressService = require('../../services/press');

router.get('/', auth.login, function (req, res) {
    res.render('user/main', {name : req.session.key.id});
});

router.get('/news', auth.login, function (req, res) {
    res.render('user/news', {name : req.session.key.id});
});

router.get('/press', auth.login, function (req, res) {
    res.render('user/press', {name : req.session.key.id});
});

router.get('/press/:name', auth.login, async function (req, res) {
    const name = req.session.key.id;
    const data = {
        name : name,
        press : await pressService.getPress(req.params.name),
    }
    res.render('user/pressDetail', data);
});

router.get('/test', auth.login, function (req, res) {
    res.render('user/test', {name : req.session.key.id});
});

module.exports = router;