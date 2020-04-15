const express = require('express');
const router = express.Router();
const user = require('../../services/user');
const auth = require('../../services/util/auth');

router.get('/', auth.indexLogin, async function(req, res) {
    res.render('index');
});

router.get('/main', auth.login, function (req, res) {
    res.render('user/user', {name : req.session.key.id});
});

router.get('/get', function(req, res, next) {
    res.json(req.session);
});

router.get('/auth', async function(req, res, next) {
    if(await user.auth(req.query.code)) {
        req.session.destroy(err => {console.log(err)});
        res.render('link', {link : "/", text : "인증 되었습니다!"});
    }
    req.session.destroy(err => {console.log(err)});
    res.render('link', {link : "/", text : "잘못된 접근입니다."});
});


router.post('/login', auth.indexLogin, async function(req, res) {
    const data = {
        id : req.body.id,
        auth : await user.authCheck(req.body.id)
    };
    ((await user.login(req.body)) > 0) ? req.session.key = data : req.session.destroy(err => {console.log(err)})
    res.redirect('/main');
});

router.get('/logout', async function(req, res, next) {
    await req.session.destroy(err => {console.log(err)});
    res.redirect('/');
});



module.exports = router;