const express = require('express');
const router = express.Router();
const newsService = require('../../services/news');


// default url : /news

router.get('/', async function(req, res, next) {
    const newses = await newsService.getNewsList(req.query.page);
    console.log(newses[0].id);
    res.render('user/news', {list : newses});
});

router.get('/:id', async function(req, res, next) {
    res.render("news", {news : await newsService.getNews(req.params.id)});
});

module.exports = router;