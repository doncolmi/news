const express = require('express');
const router = express.Router();
const auth = require('../../services/util/auth');
const set = require('../../services/set');

// default url : /set

router.get('/', auth.login, async function (req, res) {
    res.json(await set.checkSet(req.session.key.id));
});

router.get('/comment', auth.login, async function(req, res) {
    await set.comment(req.session.key.id);
})

module.exports = router;