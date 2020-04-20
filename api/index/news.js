const express = require('express');
const router = express.Router();
const newsService = require('../../services/news');


// default url : /news

router.get('/', async function(req, res, next) {
    const newses = await newsService.getNewsList(req.query.page);
    console.log(newses[0].id);
    res.render('news/news', {list : newses});
});

router.get('/recent', async function(req, res, next) {
    const newses = await newsService.getNewsRecent();
    res.render('news/recentNews', {list : newses});
});

router.get('/cnt', async function(req, res, next) {
    res.json(await newsService.cntNews());
});


module.exports = router;