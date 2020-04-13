const express = require('express');
const router = express.Router();
const user = require('../../services/user');

router.get('/', async function(req, res, next) {
    res.json(await user.vali(req.query.data, req.query.type));
})
router.post('/',async function(req, res, next) {
    res.json(await user.join(req.body));
});

router.get('/logout', async function(req, res, next) {
    await req.session.destroy(err => {console.log(err)});
    res.json(await req.session);
})
router.post('/login', async function(req, res, next) {
    const login = (await user.login(req.body)) > 0;
    console.log(login);
    login ? req.session.key = req.body.id : req.session.destroy(err => {console.log(err)})
    res.json(login);
});

module.exports = router;