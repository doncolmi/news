const express = require('express');
const router = express.Router();

const auth = require('../../services/util/auth');
const newsService = require('../../services/news');
const userService = require('../../services/user');

// default url : /news

router.get('/', async function(req, res, next) {
    const newses = await newsService.getNewsList(req.query.page);
    console.log(newses[0].id);
    res.render('item/news', {list : newses});
});

router.get('/recent', async function(req, res, next) {
    const newses = await newsService.getNewsRecent();
    res.render('item/recentNews', {list : newses});
});

router.get('/cnt', async function(req, res, next) {
    res.json(await newsService.cntNews());
});

router.get('/:id', async function(req, res) {
    const data = {
        name : req.session.key.id,
        news : await newsService.getNewsLe(req.params.id, req.session.key.id),
        replyCnt : await newsService.getNewsReplyCnt(req.params.id),
        reply : await newsService.getNewsReply(req.params.id),
        set : await userService.getSetting(req.session.key.id),
    };
    res.render('item/newsDetail', data);
});

router.post('/:id/reply', auth.login, async function(req, res) {
    await newsService.saveNewsReply(req.params.id, req.session.key.id, req.body.contents);
    const data = {
        name : req.session.key.id,
        news : await newsService.getNewsLe(req.params.id, req.session.key.id),
        replyCnt : await newsService.getNewsReplyCnt(req.params.id),
        reply : await newsService.getNewsReply(req.params.id),
        set : await userService.getSetting(req.session.key.id),
    };
    res.render('item/newsDetail', data);
});

router.get('/reply/:id', auth.login, async function (req, res) {
    const reply = await newsService.getReplyContents(req.params.id);
    res.render('item/modifyReply', {reply : reply, id : req.params.id});
});

router.patch('/reply/:id', auth.login, async function(req, res) {
    const reply = await newsService.updateReplyContents(req.params.id, req.body.contents);
    res.json(reply.contents);
})

router.delete('/reply/:id', auth.login, async function(req, res) {
    await newsService.deleteReply(req.params.id);
    res.json(true);
})

router.get('/:id/reply', auth.login, async function (req, res) {
     const reply = await newsService.getAddReply(req.params.id, req.query.page);
     res.render('item/addReply', {name : req.session.key.id ,reply : reply});
})

router.get('/save/:id', auth.login, async function (req, res) {
    const save = await newsService.saveNews(req.session.key.id, req.params.id);
    res.render('item/saveNews/saveNews', {save : save, id : req.params.id})
})
router.delete('/save/:id', auth.login, async function(req, res) {
    const del = await newsService.deleteNews(req.params.id);
    res.render('item/saveNews/deleteNews', {news : del})
})

router.get('/save/cnt', auth.login, async function(req, res) {
    const cnt = await newsService.cntSaveNews(req.session.key.id);
    res.json((cnt.data / 10));
})

router.get('/save', auth.login, async function(req, res) {
    const news = await newsService.getSaveNews(req.session.key.id, req.params.page);
    res.render('item/news', {list : news});
})

module.exports = router;