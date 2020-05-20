const express = require('express');
const router = express.Router();
const user = require('../../services/user');
const auth = require('../../services/util/auth');

router.get('/', async function(req, res, next) {
    res.json(await user.vali(req.query.data, req.query.type));
});

router.post('/',async function(req, res, next) {
    res.json(await user.join(req.body));
});

router.post('/resend',async function(req, res, next) {
    res.json(await user.resend(req.body.email));
});

router.get('/info', auth.login, async function(req, res) {
    res.render('user/mod/changePw', {name : req.session.key.id});
})

router.post('/info', auth.login, async function(req, res) {
    res.json(await user.authPw(req.session.key.id ,req.body.pw));
});

router.post('/chgPw', auth.login, async function(req, res) {
    const result = await user.chgPwInMyPage(req.session.key.id ,req.body.pw)
    if(result) {
        await req.session.destroy(err => {console.log(err)});
        res.json(true);
    } else {
        res.json(false);
    }
});
module.exports = router;