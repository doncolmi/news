const express = require('express');
const router = express.Router();

const auth = require('../../services/util/auth');
const newsService = require('../../services/news');
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
        news : await newsService.getNewsLe(req.params.id),
    };
    res.render('item/newsDetail', data);
});


module.exports = router;