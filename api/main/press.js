const express = require('express');
const router = express.Router();
const auth = require('../../services/util/auth');
const pressService = require('../../services/press');
const newsService = require('../../services/news');

// default url : /press

router.get('/', auth.login, async function (req, res) {
    const presses = await pressService.getPressList(req.session.key.id);
    res.render('item/press', {list : presses});
});

router.get('/:name/news', auth.login, async function (req, res) {
    const newses = await newsService.getPressNews(req.params.name, req.query.page);
    res.render('item/news', {list : newses});
});

router.get('/:name/cnt', auth.login, async function (req, res) {
    res.json(await newsService.cntPressNews(req.params.name));
});

router.get('/follow', auth.login, async function (req, res) {
    const presses = await pressService.getPressListOrderByFollow(req.session.key.id);
    res.render('item/press', {list : presses});
});

router.get('/add', auth.login, async function (req, res) {
    const add = await pressService.add(req.query.name, req.session.key.id);
    res.json(add);
});


router.get('/remove', auth.login, async function (req, res) {
    try{
        await pressService.remove(req.query.name, req.session.key.id);
        res.json(true);
    }catch (e) {
        console.log("오루!");
        res.json(false);
    }
});

module.exports = router;