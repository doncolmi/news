const express = require('express');
const router = express.Router();
const auth = require('../../services/util/auth');

router.get('/', auth.login, function (req, res) {
    res.render('user/main', {name : req.session.key.id});
});

module.exports = router;