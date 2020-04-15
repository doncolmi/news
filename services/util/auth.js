const user = require('../user');
const auth = {};

auth.indexLogin = async function(req, res, next) {
    !req.session.key ? next() : res.redirect('/main');
};

auth.login = async function(req,res,next) {
    req.session.key ? (req.session.key.auth? next() : res.render('user/auth', {email : await user.getEmail(req.session.key.id)})) : res.redirect('/');
}

module.exports = auth;