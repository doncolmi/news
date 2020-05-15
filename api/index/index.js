const express = require('express');
const router = express.Router();
const user = require('../../services/user');
const auth = require('../../services/util/auth');
const newsService = require('../../services/news');

router.get('/', auth.indexLogin, async function(req, res) {
    res.render('index');
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
        auth : await user.authCheck(req.body.id),
    };
    const result = await user.login(req.body) > 0;
    if(result) {
        req.session.key = data;
    } else {
        req.session.destroy(err => {console.log(err)});
    }
    res.json(result);
});

router.get('/find/id', auth.indexLogin, async function(req, res) {
   const id = await user.findId(req.query.email);
   res.json(id);
});

router.get('/find/pw', auth.indexLogin, async function(req, res) {
    try{
        await user.findPw(req.query.email, req.query.id);
        res.render("item/find/emailAuth");
    } catch (e) {
        console.log(e);
        res.json(`<div style="text-align:center;">해당 정보로로 가입된 아이디가 없습니다.</div>`);
    }
});

router.get('/find', auth.indexLogin, async function (req, res) {
    res.render('item/findForm', {type : req.query.type});
});

router.get('/logout', async function(req, res, next) {
    await req.session.destroy(err => {console.log(err)});
    res.redirect('/');
});

router.get('/follow', auth.login, async function(req, res) {
    const id = req.session.key.id;
    const press = await user.getFollowPress(id);
    const topic = await user.getFollowTopic(id);
    res.render('item/followList', {press : press, topic : topic});
});

router.get('/save', auth.login, async function(req, res) {
    const news = await newsService.getSaveNews(req.session.key.id, req.query.page);
    res.render('item/news', {list : news});
})


module.exports = router;