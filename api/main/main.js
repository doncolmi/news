const express = require('express');
const router = express.Router();
const auth = require('../../services/util/auth');
const pressService = require('../../services/press');
const topicService = require('../../services/topic');
const mainService = require('../../services/main');
const newsService = require('../../services/news')
const userService = require('../../services/user');


router.get('/', auth.login, function (req, res) {
    res.render('user/main', {name : req.session.key.id});
});

router.get('/cnt/:type', auth.login, async function (req, res) {
    try{
        res.json(await mainService.cnt(req.session.key.id, req.params.type));
    } catch(e) {
        console.log(e);
        console.log("error");
        res.json(0);
    }
})

router.get('/myNews', auth.login, async function (req, res) {
    const newses = await newsService.getMyNewsByPress(req.session.key.id, req.query.page);
    res.render('item/news', {list : newses});
})

router.post('/myNews', auth.login, async function (req, res) {
    const newses = await newsService.getMyNewsTopic(req.session.key.id, req.body.page);
    res.render('item/news', {list : newses});
})

router.get('/news', auth.login, function (req, res) {
    res.render('user/news', {name : req.session.key.id});
});

router.get('/press', auth.login, function (req, res) {
    res.render('user/press', {name : req.session.key.id});
});

router.get('/topic', auth.login, async function (req, res) {
    const name = req.session.key.id;
    const data = {
        name : name,
        follow : await topicService.getTopicFollow(),
        followMe : await topicService.getTopicFollowMe(name),
    }
    res.render('user/topic', data);
});

router.get('/press/:name', auth.login, async function (req, res) {
    const name = req.session.key.id;
    const data = {
        name : name,
        press : await pressService.getPress(req.params.name),
    }
    res.render('user/pressDetail', data);
});

router.get('/topic/:name', auth.login, async function (req, res) {
    const name = req.session.key.id;
    const data = {
        name : name,
        topic : await topicService.getTopic(req.params.name),
    }
    res.render('user/topicDetail', data);
});

router.get('/test', auth.login, function (req, res) {
    res.render('user/test', {name : req.session.key.id});
});

router.get('/save', auth.login, function (req, res) {
    res.render('user/saveNews', {name : req.session.key.id});
});

router.get('/my', auth.login, async function (req, res) {
    const myInfo = await userService.getUserInfo(req.session.key.id);
    res.render('user/myPage', {info : myInfo, name : req.session.key.id});
});

router.get('/authpw', auth.login, async function (req, res) {
    res.render('user/mod/authPw');
})

module.exports = router;