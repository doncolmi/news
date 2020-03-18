const express = require('express');
const router = express.Router();
const user = require('../../services/user');

router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/user',function(req, res, next) {
    user.getUser("asdf")
        .then(result => {
            res.render('user', { user : result });
        });
});

module.exports = router;