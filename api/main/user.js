const express = require('express');
const router = express.Router();
const user = require('../../services/user');

router.post('/',async function(req, res, next) {
    res.json(await user.join(req.body));
});

module.exports = router;