const express = require('express');
const router = express.Router();
const user = require('../../services/user');

router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/user',async function(req, res, next) {
    res.render('user', { user : await user.getUser("asdf") });
});

module.exports = router;