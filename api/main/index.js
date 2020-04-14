const express = require('express');
const router = express.Router();
const user = require('../../services/user');

router.get('/', async function(req, res, next) {
    const key = req.session.key;
    if(key) {
        if(await user.authCheck(key)) {
            res.render('user/user', {name : key});
        } else {
            res.render('user/auth', {name : key, email : await user.getEmail(key)})
        }
    } else {
        res.render('index');
    }
});

router.get('/get', function(req, res, next) {
    res.json(req.session);
});

router.get('/auth', async function(req, res, next) {
    if(await user.auth(req.query.code)) {
        res.render('link', {link : "/", text : "인증 되었습니다!"});
    }
    res.render('link', {link : "/", text : "잘못된 접근입니다."});
});


module.exports = router;