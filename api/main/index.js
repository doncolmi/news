const express = require('express');
const router = express.Router();
const axios = require('axios');
const user = require('../../services/user');

router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/user',function(req, res, next) {
    const session = "asdf";
    const url = "http://localhost:8080/user?uid=" + session;
    axios.get(url)
        .then(result => {
            res.render('user', { user : result.data });
        });
});

module.exports = router;