const express = require('express');
const router = express.Router();
const auth = require('../../services/util/auth');
const pressService = require('../../services/press');

// default url : /press

router.get('/', auth.login, async function (req, res) {
    const presses = await pressService.getPressList(req.session.key.id);
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