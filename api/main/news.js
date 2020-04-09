const express = require('express');
const router = express.Router();
const newsService = require('../../services/news');


// default url : /news

router.get('/:id', async function(req, res, next) {
    res.render("news", {news : await newsService.getNews(req.params.id)});
});

module.exports = router;