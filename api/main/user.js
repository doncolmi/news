const express = require('express');
const router = express.Router();
const user = require('../../services/user');

router.get('/', async function(req, res, next) {
    res.json(await user.vali(req.query.data, req.query.type));
})
router.post('/',async function(req, res, next) {
    res.json(await user.join(req.body));
});

router.post('/resend',async function(req, res, next) {
    res.json(await user.resend(req.body.email));
});


module.exports = router;