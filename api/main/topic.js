const express = require('express');
const router = express.Router();
const auth = require('../../services/util/auth');
const newsService = require('../../services/news');
const topicService = require('../../services/topic');


// default url : /press

router.get('/:name/news', auth.login, async function (req, res) {
    const newses = await newsService.getTopicNews(req.params.name, req.query.page);
    res.render('item/news', {list : newses});
});

router.get('/:name/cnt', auth.login, async function (req, res) {
    res.json(await newsService.cntTopicNews(req.params.name));
});

router.get('/add', auth.login, async function (req, res) {
    const add = await topicService.add(req.query.name, req.session.key.id);
    res.json(add);
});


router.get('/remove', auth.login, async function (req, res) {
    try{
        await topicService.remove(req.query.name, req.session.key.id);
        res.json(true);
    }catch (e) {
        console.log("오루!");
        res.json(false);
    }
});

module.exports = router;