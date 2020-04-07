const express = require('express');
const router = express.Router();
const user = require('../../services/user');

router.get('/', function(req, res, next) {
    res.render('index');
});
router.post('/user',async function(req, res, next) {
    console.log(req.body.id);
    res.send(await user.join(req.body.id));
});

module.exports = router;